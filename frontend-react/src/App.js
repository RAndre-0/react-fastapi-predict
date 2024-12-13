import React, { useEffect, useState } from "react";

function App() {
	const [message, setMessage] = useState("");
	const [formData, setFormData] = useState({
		holiday: "",
		temp: "",
		rain_1h: "",
		snow_1h: "",
		clouds_all: "",
		weather_main: "",
		weather_description: "",
		day: "",
		month: "",
		year: "",
		hour: "",
		date: "2024-06-12T00:00",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		
	
		try {
		  const response = await fetch("http://localhost:8000/api", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		  });
	
		  if (response.ok) {
			const data = await response.json();
			setMessage(data.prediction);
			console.log("Réponse de l'API:", data);
		  } else {
			setMessage("Erreur lors de la prédiction");
			console.error("Erreur lors de l'appel API");
		  }
		} catch (error) {
		  console.error("Erreur de réseau:", error);
		}
	  };

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	useEffect(() => {
		fetch("http://localhost:8000/")
			.then((response) => response.json())
			.then((data) => setMessage(data.message));
	}, []);

	return (
		<div id="formContainer">
			<h1>Prédiction</h1>

			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="holiday">Holiday:</label>
					<input
						type="text"
						id="holiday"
						name="holiday"
						value={formData.holiday}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label htmlFor="temp">Température (°C):</label>
					<input
						type="number"
						id="temp"
						name="temp"
						value={formData.temp}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label htmlFor="rain_1h">Rain (1h):</label>
					<input
						type="number"
						id="rain_1h"
						name="rain_1h"
						value={formData.rain_1h}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label htmlFor="snow_1h">Neige (1h):</label>
					<input
						type="number"
						id="snow_1h"
						name="snow_1h"
						value={formData.snow_1h}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label htmlFor="clouds_all">Nuages (%):</label>
					<input
						type="number"
						id="clouds_all"
						name="clouds_all"
						value={formData.clouds_all}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label htmlFor="weather_main">Météo (Main):</label>
					<input
						type="text"
						id="weather_main"
						name="weather_main"
						value={formData.weather_main}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label htmlFor="weather_description">Météo (Description):</label>
					<input
						type="text"
						id="weather_description"
						name="weather_description"
						value={formData.weather_description}
						onChange={handleChange}
					/>
				</div>

				<div>
					{/* <label htmlFor="day">Jour:</label>
					<input
						type="number"
						id="day"
						name="day"
						value={formData.day}
						onChange={handleChange}
					/> */}
					<label htmlFor="day">Jour:</label>
					<select id="day" name="day" value={formData.day} onChange={handleChange}>
						<option value="">--Jour--</option>
						<option value="Monday">Lundi</option>
						<option value="Tuesday">Mardi</option>
						<option value="Wednesday">Mercredi</option>
						<option value="Thursday">jeudi</option>
						<option value="Friday">Vendredi</option>
						<option value="Saturday">Samedi</option>
						<option value="Sunday">Dimanche</option>
					</select>
				</div>

				<div>
					<label htmlFor="month">Mois:</label>
					<select id="month" name="month" value={formData.month} onChange={handleChange}>
						<option value="">--Mois--</option>
						<option value="1">Janvier</option>
						<option value="2">Février</option>
						<option value="3">Mars</option>
						<option value="4">Avril</option>
						<option value="5">Mai</option>
						<option value="6">Juin</option>
						<option value="7">Juillet</option>
						<option value="8">Aôut</option>
						<option value="9">Septembre</option>
						<option value="10">Octobre</option>
						<option value="11">Novembre</option>
						<option value="12">Décembre</option>
					</select>
				</div>

				<div>
					<label htmlFor="year">Année:</label>
					<input
						type="number"
						id="year"
						name="year"
						value={formData.year}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label htmlFor="hour">Heure:</label>
					<input
						type="number"
						id="hour"
						name="hour"
						value={formData.hour}
						onChange={handleChange}
					/>
				</div>

				<div>
				<label htmlFor="date">Date:</label>
				<input
					type="datetime-local"
					id="date"
					name="date"
					value="2024-06-12T00:00"
					onChange={handleChange}
				/>
				</div>


				<button type="submit">Obtenir une prédiction</button>
			</form>
			<h1>{message}</h1>
		</div>
	);
}

export default App;
