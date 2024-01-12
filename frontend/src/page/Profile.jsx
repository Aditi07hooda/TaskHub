import React from "react";
import { CDBBtn, CDBIframe, CDBView } from "cdbreact";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import "../css/Profile.css"

export const Profile = () => {

	return (
		<div className="d-flex profile">
			<div>
      	<Sidebar/>
			</div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
      	<Navbar/>
      	<div style={{height:"100%"}}>
					<div style={{height:"calc(100% - 64px)", padding:"20px 5%", overflowY:"scroll"}}>
						<div style={{margin:"0 auto", maxWidth:"1320px"}}>
							<div  className="cards-container1">
								<div>
									<div className="card shadow border-0">
										<img alt="profileImage" src="/img/pages/heroImage2.png" className="w-100" style={{objectFit:"cover", maxHeight:"500px"}}/>
										<div className="card-body">
											<h4 className="card-title mb-2" style={{fontWeight:"600"}}>Warren Briggs</h4>
											<h5 className="mb-2">Photographer</h5>
											<p className="text-justify mt-4">
												<strong className="mb-2">Desciption: </strong>
												Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione perferendis quod animi dignissimos
											</p>
											<div className="justify-content-end pr-1">
												<CDBBtn color="dark" outline>More</CDBBtn>
											</div>
										</div>
									</div>
								</div>
							</div>
				    </div>
					</div>
				</div>
			</div>
		</div>

	);
}