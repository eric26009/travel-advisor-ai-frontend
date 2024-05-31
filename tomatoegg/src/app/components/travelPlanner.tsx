"use client";
import React, { useState } from "react";
import axios from "axios";

const TravelPlanner = () => {
	const [selectKnownLocation, setSelectKnownLocation] = useState(true);
	const [destination, setDestination] = useState("");
	const [startLocation, setStartLocation] = useState("");
	const [travelType, setTravelType] = useState("");
	const [month, setMonth] = useState("");

	const handleLocationClick = (value: boolean) => {
		setSelectKnownLocation(value);
		setDestination("");
		setStartLocation("");
		setTravelType("");
		setMonth("");
	};

    const submit = () => {
        if(selectKnownLocation){
            if(!destination || !month){
                console.log("Missing parameters")
            }else{
                fetchKnownLocation();
            }
        }else{
            if(!startLocation || !travelType || !month){
                console.log("Missing parameters")
            }else{
                fetchUnknownLocation();
            }
        }
    }

    const fetchKnownLocation = async () => {
        try{
            const response = await axios.get(`http://localhost:8000/travel/known?endLocation=${destination}&month=${month}`)
            console.log(response.data);
        }catch(err){
            console.log(err);
        }
    }

    const fetchUnknownLocation = async () => {
        try{
            const response = await axios.get(`http://localhost:8000/travel/unknown?startLocation=${startLocation}&type=${travelType}&month=${month}`)
            console.log(response.data);
        }catch(err){
            console.log(err);
        }
    }

	return (
		<div>
			<main className="h-screen flex items-center justify-center">
				<div className="w-full max-w-lg">
					<div className="flex border-b">
						<div className="-mb-px mr-1 w-full">
							<button
								className={`bg-white inline-block py-2 px-4 w-full ${
									selectKnownLocation
										? "border-l border-t border-r rounded-t"
										: ""
								}`}
								onClick={() => handleLocationClick(true)}
							>
								Known Location
							</button>
						</div>
						<div className="-mb-px w-full">
							<button
								className={`bg-white inline-block py-2 px-4 w-full ${
									selectKnownLocation
										? ""
										: "border-l border-t border-r rounded-t"
								}`}
								onClick={() => handleLocationClick(false)}
							>
								Unknown Location
							</button>
						</div>
					</div>
					{selectKnownLocation ? (
						<>
							<div className="flex border-x justify-center items-center pt-5">
								<div className="w-[100px]">Destination:</div>
								<input
									className="w-[200px] mx-5 py-1 px-3 border rounded focus:outline-none"
									type="text"
									placeholder="Seattle"
									value={destination}
									onChange={(e) =>
										setDestination(e.target.value)
									}
								/>
							</div>
							<div className="flex border-x justify-center items-center py-5">
								<div className="w-[100px]">Month:</div>
								<input
									className="w-[200px] mx-5 py-1 px-3 border rounded focus:outline-none"
									type="text"
									placeholder="May"
									value={month}
									onChange={(e) => setMonth(e.target.value)}
								/>
							</div>
						</>
					) : (
						<>
							<div className="flex border-x justify-center items-center pt-5">
								<div className="w-[150px]">Start Location:</div>
								<input
									className="w-[200px]  py-1 px-3 border rounded focus:outline-none"
									type="text"
									placeholder="Seattle"
									value={startLocation}
									onChange={(e) =>
										setStartLocation(e.target.value)
									}
								/>
							</div>
							<div className="flex border-x justify-center items-center pt-5">
								<label className="flex p-3">
									<input
										type="radio"
										name="travelType"
										value="domestic"
										checked={travelType == "domestic"}
										onChange={(e) =>
											setTravelType(e.target.value)
										}
									/>
									<span className="ml-3">Domestic</span>
								</label>
								<label className="flex p-3">
									<input
										type="radio"
										name="travelType"
										value="roadTrip"
										checked={travelType == "roadTrip"}
										onChange={(e) =>
											setTravelType(e.target.value)
										}
									/>
									<span className="ml-3">Roadtrip</span>
								</label>
								<label className="flex p-3">
									<input
										type="radio"
										name="travelType"
										value="international"
										checked={travelType == "international"}
										onChange={(e) =>
											setTravelType(e.target.value)
										}
									/>
									<span className="ml-3">International</span>
								</label>
							</div>
							<div className="flex border-x justify-center items-center py-5">
								<div className="w-[100px]">Month:</div>
								<input
									className="w-[200px] mx-5 py-1 px-3 border rounded focus:outline-none"
									type="text"
									placeholder="May"
									value={month}
									onChange={(e) => setMonth(e.target.value)}
								/>
							</div>
						</>
					)}
					<div className="flex border-x justify-center items-center pb-5 border-b">
						<button
							className="w-[50%] py-2 px-4 rounded bg-black text-white font-bold border border-transparent hover:bg-white hover:text-black hover:border-black"
							type="button"
                            onClick={() => submit()}
						>
							Submit
						</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default TravelPlanner;
