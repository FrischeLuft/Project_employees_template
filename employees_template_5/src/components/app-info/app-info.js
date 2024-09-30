import "./app-info.css";

const AppInfo = ({ employeesCount, employyesWithIncrease }) => {
	return (
		<div className="app-info">
			<h1>Учет сотрудников в компании N</h1>
			<h2>Общее число сотрудников: {employeesCount}</h2>
			<h2>Сотрудники, получившие компенсацию за переработки: {employyesWithIncrease}</h2>
		</div>
	)
}

export default AppInfo;