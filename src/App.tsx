import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Space, 
  message, 
  Typography,
  Collapse
} from 'antd';
import apiClient from './api'; // Our new API client

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Panel } = Collapse;
const { TextArea } = Input;

// --- Define our TypeScript Types ---

// Matches the TaskExecution object from Java
interface TaskExecution {
  startTime: string; // Dates will come as strings
  endTime: string;
  output: string;
}

// Matches the Task object from Java
interface Task {
  id: string;
  name: string;
  owner: string;
  command: string;
  taskExecutions: TaskExecution[] | null;
}

// --- The Main App Component ---

const App: React.FC = () => {
  // --- State Variables ---
  const [tasks, setTasks] = useState<Task[]>([]); // Holds the list of tasks
  const [loading, setLoading] = useState<boolean>(true); // For loading spinners
  const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState<boolean>(false);

  // Ant Design forms
  const [createForm] = Form.useForm();
  const [searchForm] = Form.useForm();

  // --- API Functions ---

  // 1. Fetch all tasks
  const fetchTasks = async (url: string = '/tasks') => {
    setLoading(true);
    try {
      const response = await apiClient.get<Task[]>(url);
      // The Java backend returns a list, even for a single ID
      // and sometimes null, so we handle that
      setTasks(response.data || []); 
    } catch (error) {
      console.error('Error fetching tasks:', error);
      message.error('Failed to fetch tasks. Is the Java backend running?');
      setTasks([]); // Clear tasks on error
    } finally {
      setLoading(false);
    }
  };

  // 2. Create a new task
  const handleCreate = async (values: Task) => {
    try {
      await apiClient.put('/tasks', values);
      message.success('Task created successfully!');
      setIsCreateModalVisible(false);
      createForm.resetFields();
      fetchTasks(); // Refresh the table
    } catch (error) {
      console.error('Error creating task:', error);
      message.error('Failed to create task. Check the command for unsafe words.');
    }
  };

  // 3. Delete a task
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await apiClient.delete(`/tasks/${id}`);
        message.success('Task deleted successfully!');
        fetchTasks(); // Refresh the table
      } catch (error) {
        console.error('Error deleting task:', error);
        message.error('Failed to delete task.');
      }
    }
  };

  // 4. Execute a task
  const handleExecute = async (id: string) => {
    try {
      await apiClient.put(`/tasks/${id}/execute`);
      message.success('Task executed successfully! Check execution history.');
      fetchTasks(); // Refresh the table
    } catch (error) {
      console.error('Error executing task:', error);
      message.error('Failed to execute task.');
    }
  };

  // 5. Search for tasks by name
  const handleSearch = async (values: { name: string }) => {
    setIsSearchModalVisible(false);
    searchForm.resetFields();
    fetchTasks(`/tasks/findByName?name=${values.name}`); // Use the findByName endpoint
  };

  // Load tasks when the component first renders
  useEffect(() => {
    fetchTasks();
  }, []);

  // --- Table Columns Definition ---
  const columns = [
    {
      title: 'Task ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Command',
      dataIndex: 'command',
      key: 'command',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Task) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleExecute(record.id)}>Execute</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

// --- Render the UI ---
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ position: 'sticky', top: 0, zIndex: 10, width: '100%' }}>
        <Title style={{ color: 'white', lineHeight: '64px' }}>Kaiburr Task 3 - React UI</Title>
      </Header>
      
      <Content style={{ padding: '24px 50px', overflow: 'auto' }}>
        <Space style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
            Create Task
          </Button>
          <Button onClick={() => setIsSearchModalVisible(true)}>
            Search by Name
          </Button>
          <Button onClick={() => fetchTasks()}>
            Show All Tasks
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={tasks}
          loading={loading}
          rowKey="id"
          expandable={{
            expandedRowRender: (record) => (
              <Collapse>
                <Panel header={`Execution History (${record.taskExecutions?.length || 0})`} key="1">
                  {record.taskExecutions && record.taskExecutions.length > 0 ? (
                    record.taskExecutions.map((exec, index) => (
                      <div key={index} style={{ marginBottom: 16, padding: 16, background: '#f0f2f5', borderRadius: 8 }}>
                        <p><strong>Start Time:</strong> {new Date(exec.startTime).toLocaleString()}</p>
                        <p><strong>End Time:</strong> {new Date(exec.endTime).toLocaleString()}</p>
                        <strong>Output:</strong>
                        <pre style={{ background: 'black', color: 'white', padding: 10, borderRadius: 4, overflowX: 'auto' }}>
                          {exec.output || '(No output)'}
                        </pre>
                      </div>
                    ))
                  ) : (
                    <p>No execution history for this task.</p>
                  )}
                </Panel>
              </Collapse>
            ),
            rowExpandable: (record) => true,
          }}
        />
      </Content>

      <Footer style={{ textAlign: 'center', position: 'sticky', bottom: 0, zIndex: 10, width: '100%' }}>
        Kaiburr Assessment ©2025 Created by [Your Name Here]
      </Footer>

      {/* --- Modals (Pop-ups) --- */}

      <Modal
        title="Create New Task"
        open={isCreateModalVisible}
        onOk={() => createForm.submit()}
        onCancel={() => setIsCreateModalVisible(false)}
      >
        <Form form={createForm} onFinish={handleCreate} layout="vertical">
          <Form.Item name="id" label="Task ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="owner" label="Owner" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="command" label="Command" rules={[{ required: true }]}>
            <TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Search Task by Name"
        open={isSearchModalVisible}
        onOk={() => searchForm.submit()}
        onCancel={() => setIsSearchModalVisible(false)}
      >
        <Form form={searchForm} onFinish={handleSearch} layout="vertical">
          <Form.Item name="name" label="Name contains..." rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default App;