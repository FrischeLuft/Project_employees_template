import { Component } from 'react';
import nextId from 'react-id-generator'

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ name: 'John C.', salary: 800, increase: false, id: 1 },
				{ name: 'Alex M.', salary: 3000, increase: true, id: 2 },
				{ name: 'Karl W.', salary: 5000, increase: false, id: 3 },
			]
		}
	}

	deleteItem = (id) => {
		this.setState(({ data }) => {
			return {
				data: data.filter(item => item.id !== id)
			}

		});
	}

	addItem = (name, salary) => {
		//Генерируем новый id сотрудника
		const newId = nextId();
		const newItem = {
			name,
			salary,
			increase: false,
			id: newId
		};
		this.setState(({ data }) => {
			const newData = [...data, newItem]; //Добавляем нового сотрудника 
			return {
				data: newData
			};
		});
	}

	render() {
		return (
			<div className="app" >
				<AppInfo />

				<div className="search-panel">
					<SearchPanel />
					<AppFilter />
				</div>

				<EmployeesList
					data={this.state.data}
					onDelete={this.deleteItem} />
				<EmployeesAddForm
					onAdd={this.addItem}
				/>
			</div>
		);
	}

}

export default App;
