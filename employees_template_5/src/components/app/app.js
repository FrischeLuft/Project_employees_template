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
				{ name: 'John C.', salary: 800, increase: false, rise: true, id: 1 },
				{ name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2 },
				{ name: 'Karl W.', salary: 5000, increase: false, rise: false, id: 3 },
			],
			term: '',
			filter: 'all' //Новое состояние для хранения текущего фильтра
		}
	}

	onUpdateSalary = (id, newSalary) => {
		this.setState(({ data }) => ({
			data: data.map(item => {
				if (item.id === id) {
					return { ...item, salary: newSalary };
				}
				return item;
			})
		}));
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
			rise: false,
			id: newId
		};
		this.setState(({ data }) => {
			const newData = [...data, newItem]; //Добавляем нового сотрудника 
			return {
				data: newData
			};
		});
	}

	onToggleIncrease = (id) => {
		this.setState(({ data }) => ({
			//В случае совпадения возвращается массив с одним измененным объектом
			data: data.map(item => {
				if (item.id === id) {
					return { ...item, increase: !item.increase }
				}
				return item;
			})
		}))
	}

	onToggleRise = (id) => {
		this.setState(({ data }) => ({
			//В случае совпадения возвращается массив с одним измененным объектом
			data: data.map(item => {
				if (item.id === id) {
					return { ...item, rise: !item.rise }
				}
				return item;
			})
		}))
	}

	searchEmp = (items, term) => {
		if (term.length === 0) {
			return items;
		}

		return items.filter(item => {
			return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1 //Если ничего не найдено возвращается -1
		})
	}

	onUpdateSearch = (term) => {
		this.setState({ term });
	}

	filterPost = (items, filter) => {
		switch (filter) {
			case 'rise':
				return items.filter(item => item.rise);
			case 'salary':
				return items.filter(item => item.salary > 1000);
			default:
				return items;
		}
	}

	onFilterSelect = (filter) => {
		this.setState({ filter });
	}

	render() {
		const { data, term, filter } = this.state;
		//Подсчитываем число сотрудников, с increase true:
		const employyesWithIncrease = this.state.data.filter(item => item.increase).length;
		const visibleData = this.filterPost(this.searchEmp(data, term), filter);
		return (
			<div className="app" >
				<AppInfo
					employeesCount={this.state.data.length}
					employyesWithIncrease={employyesWithIncrease}
				/>

				<div className="search-panel">
					<SearchPanel onUpdateSearch={this.onUpdateSearch} />
					<AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
				</div>

				<EmployeesList
					data={visibleData}
					onDelete={this.deleteItem}
					onToggleIncrease={this.onToggleIncrease}
					onToggleRise={this.onToggleRise}
					onUpdateSalary={this.onUpdateSalary}
				/>
				<EmployeesAddForm
					onAdd={this.addItem}
				/>
			</div>
		);
	}

}

export default App;
