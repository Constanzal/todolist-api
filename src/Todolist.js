import React, { useState, useEffect } from "react";
import './Todolist.css';


const Todolist = () => {
    let [addTask, setAddTask] = useState('');
    let [addList, setAddList] = useState([]);

    useEffect(() => {
        uploadData();
    }, [])

    const uploadData = () => {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/constanzall", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((res) => {
            console.log(res);
            return res.json()
        }).then(
            data => {
                console.log(data);
                setAddList(data);
            }
        ).catch(
            error => console.log(error)
        );
    }

    const addingToDo = (ev) => {
        setAddList([...addList, { label: '' + addTask + ' ', done: false }]);

        fetch("https://assets.breatheco.de/apis/fake/todos/user/constanzall", {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify([...addList, { label: '' + addTask + ' ', done: false }])
        }).then((res) => {
            console.log(res);
            return res.json()
        }).then(
            data => console.log(data)
        ).catch(
            error => console.log(error)
        );

        setAddTask("");
    }

    const valueChange = (e) => {
        setAddTask(e.target.value);
    }

    const deleteList = (key) => {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/constanzall", {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((res) => {
            console.log(res);
            return res.json()
        }).then(
            data => console.log(data)
        ).catch(
            error => console.log(error)
        );
    }

    const deleteTask = (key) => {
        setAddList(addList.filter((item, index) => index !== key));

        fetch("https://assets.breatheco.de/apis/fake/todos/user/constanzall", {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(addList.filter((item, index) => index !== key))
        }).then((res) => {
            console.log(res);
            return res.json()
        }).then(
            data => console.log(data)
        ).catch(
            error => console.log(error)
        );
    }

    return (
        <div className="d-flex justify-content-center">
            <div class="card mt-5 cardbody" >
                <div class="card-body">
                    <h4 class="card-title mx-2">TODO LIST</h4>
                    <div>
                        <div className="input-group mb-3">
                            <input type="text" value={addTask} className="form-control" placeholder="Añadir tarea" aria-label="Add to Do" aria-describedby="button-addon2" onChange={valueChange} />
                            <button className="btn btn-outline-secondary addbutton" type="button" id="button-addon2" onClick={addingToDo}><strong>+</strong></button>
                        </div>
                        <ul className="list-group">
                            {
                                addList.map((li, key) => <li className="list-group-item list-group-item-info" key={key} >{li}<span className="ps-5"><button onClick={() => {
                                    deleteTask(key);
                                }}>X</button></span></li>)
                            }
                        </ul>
                        <span className="d-flex"><button onClick={() => {
                            deleteList();
                        }}>Borrar lista</button></span>
                    </div >
                </div>
            </div>
        </div>
    );
};

export default Todolist;