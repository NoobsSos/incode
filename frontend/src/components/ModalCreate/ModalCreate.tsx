import React from 'react'
import { ITaskCreate } from '../../intefaces/task_create.interface'
import { task } from '../../services/task.service'
import { table } from '../../services/table.service'

import styles from './ModalCreate.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { tableActions } from '../../store/slices/tableSlice'

interface IModal {
  closeModal: () => void
  status: string
}

export const ModalCreate: React.FC<IModal> = ({closeModal, status}) => {

    const dispatch = useAppDispatch()
    const currentTable = useAppSelector((state) => state.table.currentTable)

    const CreateNewTask = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const title = (document.getElementById('title') as HTMLInputElement).value
        const description = (document.getElementById('description') as HTMLInputElement).value
        const due = (document.getElementById('due') as HTMLInputElement).value
        const priority = (document.getElementById('priority') as HTMLSelectElement).value

        const relatedTable = currentTable.name
        console.log(relatedTable)

        const taskToCreate: ITaskCreate = {
            title,
            description,
            due: new Date(due),
            priority,
            status: status,
            relatedTable
        }

        try {
            const taskResponse = await task.createTask(taskToCreate);
            await table.updateTable(relatedTable, taskResponse.data);
            const tableResponse = await table.createOrLoadTable({ name: relatedTable });
            dispatch(tableActions.setTable(tableResponse.data));
            closeModal();
          } catch (error) {
            console.error('Error creating task or updating table:', error);
          }
}   

  return (
    <div className={styles.wrapper}>
        <header className={styles.header}>
            <div>
                <button onClick={closeModal} className={styles.closeButton}>X</button>
            </div>
        </header>

        <div className={styles.container}>
            <div className={styles.content}>
                <form onSubmit={(event) => CreateNewTask(event)}>
                    <div className={styles.form_group}>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" />
                    </div>
                    
                    <div className={styles.form_group}>
                        <label htmlFor="description">Description</label>
                        <input id="description" name="description" />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="due">Due Date</label>
                        <input type="date" id="due" name="due" />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="priority">Priority</label>
                        <select className={styles.priority} id="priority" name="priority">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <button type="submit" className={styles.button_submit}>Create</button>
                </form>
            </div>
        </div>

        
    </div>
  )
}
