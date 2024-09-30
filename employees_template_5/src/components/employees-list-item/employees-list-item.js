import './employees-list-item.css';

const EmployeesListItem = (props) => {


	const { name,
		salary,
		onDelete,
		onToggleIncrease,
		onToggleRise,
		increase,
		rise,
		onUpdateSalary } = props;

	const onSalaryChange = (e) => {
		let newSalary = e.target.value.replace(/[^0-9]/g, '');
		if (newSalary === '') newSalary = '0';
		onUpdateSalary(newSalary);
	}

	let classNames = "list-group-item d-flex justify-content-between";
	if (increase) {
		classNames += ' increase';
	}
	if (rise) {
		classNames += ' like';
	}

	return (
		<li className={classNames}>
			<span className="list-group-item-label" onClick={onToggleRise}>{name}</span>
			<input
				type="text"
				className="list-group-item-input"
				value={salary + '€'}
				onChange={onSalaryChange} />
			<div className='d-flex justify-content-center align-items-center'>
				<button type="button"
					className="btn-cookie btn-sm "
					onClick={onToggleIncrease}>
					<i className="fas fa-cookie"></i>
				</button>

				<button type="button"
					className="btn-trash btn-sm "
					onClick={onDelete}>
					<i className="fas fa-trash"></i>
				</button>
				<i className="fas fa-star"></i>
			</div>
		</li>
	)

}

export default EmployeesListItem;