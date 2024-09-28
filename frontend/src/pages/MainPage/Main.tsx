import React, { useEffect } from 'react'
import { task } from '../../services/task.service'
import { table } from '../../services/table.service'
import { ITask } from '../../intefaces/task.interface'
import { ITableCreate } from '../../intefaces/table_create.inteface'
import { taskActions } from '../../store/slices/taskSlice'
import { tableActions } from '../../store/slices/tableSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

import { ModalCreate } from '../../components/ModalCreate/ModalCreate'

import styles from './Main.module.css'
function Main() {

  const [tasks, setTasks] = React.useState<ITask[]>([])
  const [taskMoved, setTaskMoved] = React.useState(false)
  const [status, setStatus] = React.useState('')
  const [tableName, setTableName] = React.useState('')
  const dispatch = useAppDispatch()

  const taskState = useAppSelector((state) => state.task)
  const currentTable = useAppSelector((state) => state.table.currentTable)
  const modal = useAppSelector((state) => state.task.modal)

  useEffect(() => { 
    setTaskMoved(false)
    dispatch(taskActions.getAllTasks(currentTable.name))
  }, [taskMoved, modal, currentTable, dispatch])

  useEffect(() => {
  setTasks(taskState.tasks)
  }, [taskState])


  const openModal = (id: string) => {
    const task = tasks.find(task => task._id === id);
    if (task) {
      dispatch(taskActions.setModal("view"))
      dispatch(taskActions.setCurrentTask(task))
    } else {
      dispatch(taskActions.setModal("create"))
    }
  }


  const moveToDo = (id: string) => {
    const taskIndex = tasks.findIndex(task => task._id === id);
    if (taskIndex === -1) return; 
  
    task.updateTask(id, { ...tasks[taskIndex], status: "To do" }).then((res) => {
      setTasks([...tasks.slice(0, taskIndex), res.data, ...tasks.slice(taskIndex + 1)])
      setTaskMoved(true)
    })
  }

    const moveInProgress = (id: string) => {
      const taskIndex = tasks.findIndex(task => task._id === id);
      if (taskIndex === -1) return; 
    
      task.updateTask(id, { ...tasks[taskIndex], status: "In progress" }).then((res) => {
        setTasks([...tasks.slice(0, taskIndex), res.data, ...tasks.slice(taskIndex + 1)])
        setTaskMoved(true)
      })      
    }

    const moveClosed = (id: string) => {    
      const taskToUpdate = tasks.find(task => task._id === id);
      if (!taskToUpdate) return;
      task.updateTask(id, { ...taskToUpdate, status: "Done" }).then(() => {
        setTaskMoved(true);
      });
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTableName(e.target.value);
    }    
  const createOrLoadTable = (tableName: string) => {
    const tableToCreate : ITableCreate = {
      name: tableName
    }

    table.createOrLoadTable(tableToCreate).then((res) => {      
      dispatch(tableActions.setTable(res.data))
    })
  }

    return (
    <div className={styles.wrapper}> 

      <header>
        <div className={styles.header_container}>
          <h1 className={styles.title}>{currentTable.name}</h1>

          <input type="text" value={tableName} onChange={handleInputChange} placeholder="Search" className={styles.search} />
          <button onClick={() => createOrLoadTable(tableName)} className={styles.button_search}>Create or Load table</button>

        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.columns_container}>
                <div className={styles.column}>
                <h2 className={styles.column_title}>To do</h2>
                <button onClick={() => { openModal("123"); setStatus('To do') }} className={styles.button_add}>Add new item</button>
                <div className={styles.card_container}>
                {tasks && tasks.filter((task) => task.status === "To do").map((task) => (
                  console.log(task),
                    <div key={task._id} className={styles.card}>
                      <button onClick={() => openModal(task._id)} className={styles.button_edit}>
                        <h3 className={styles.card_title}>{task.title}</h3>
                      </button>
                      <p className={styles.card_description}>{task.description}</p>
                      <div className={styles.due_date}>Finish to {new Date(task.due).toLocaleDateString()}</div> 
                      <button onClick={() => moveInProgress(task._id)} className={styles.button_move}>Move to Planned </button>
                  </div>
                  ))}
                </div>
              </div>

              <div className={styles.column}>
                <h2 className={styles.column_title}>In progress</h2>
                <button onClick={() => { openModal("123"); setStatus('In progress') }} className={styles.button_add}>Add new item</button>
                <div className={styles.card_container}>
                {tasks && tasks.filter((task) => task.status === "In progress").map((task) => (
                    <div key={task._id} className={styles.card}>
                      <h3 className={styles.card_title}>{task.title}</h3>
                      <p className={styles.card_description}>{task.description}</p>
                      <div className={styles.due_date}>Finish to {new Date(task.due).toLocaleDateString()}</div> 
                      <button onClick={() => moveClosed(task._id)} className={styles.button_move}>Move to Closed </button>
                      <button onClick={() => moveToDo(task._id)} className={styles.button_move}>Back </button>
                  </div>
                  ))}
                </div>
              </div>

              <div className={styles.column}>
                <h2 className={styles.column_title}>Done</h2>
                <button onClick={() => { openModal("123"); setStatus('Done') }} className={styles.button_add}>Add new item</button>
                <div className={styles.card_container}>
                {tasks && tasks.filter((task) => task.status === "Done").map((task) => (
                    <div key={task._id} className={styles.card}>
                      <h3 className={styles.card_title}>{task.title}</h3>
                      <p className={styles.card_description}>{task.description}</p>
                      <div className={styles.due_date}>Finish to {new Date(task.due).toLocaleDateString()}</div> 
                      <button onClick={() => moveInProgress(task._id)} className={styles.button_move}>Back </button>
                  </div>
                  ))}
                </div>
              </div>
        </div>
      </div>
      {modal === "create" && <div className={styles.overlay}></div>}
      {modal && modal === "create" && <div className={styles.center}><ModalCreate closeModal={() => dispatch(taskActions.setModal(''))} status={status}/></div>}
    </div>
  )
}

export default Main
