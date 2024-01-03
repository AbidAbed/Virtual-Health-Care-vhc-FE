import { useEffect, useState } from "react";
import {
  addDoctors,
  changePath,
  changeSelectedDoctorId,
  useGetDoctorsQuery,
} from "../Store/StoreInterface";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Components/Button";
import { MdNavigateNext } from "react-icons/md";
import { GrLinkNext } from "react-icons/gr";
function Doctors() {
  const [page, setPage] = useState(1);
  
  const dispatch = useDispatch();

  // Assuming getPageResponse is an asynchronous function that fetches data
  const getPageResponse = useGetDoctorsQuery(page);

  const doctors = useSelector((state) => state.doctors);

  console.log(doctors,page);

  useEffect(() => {
    if (!getPageResponse.isLoading && !getPageResponse.isUninitialized) {
      if (getPageResponse.isError) {
        // Handle error
      } else {
        // Assuming addDoctors is an action creator that adds doctors to the Redux store
        console.log(getPageResponse.data)
          dispatch(addDoctors(getPageResponse.data));
      }
    }
  }, [getPageResponse, dispatch]);

  return (
    <div className="w-screen h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-md bg-white rounded-md shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Doctors</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Proficiency</th>
              <th className="py-2 px-4 border-b">Bio</th>
              <th className="py-2 px-4 border-b">Rate</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{doctor.name}</td>
                <td className="py-2 px-4 border-b">{doctor.proficiency}</td>
                <td className="py-2 px-4 border-b">{doctor.bio}</td>
                <td className="py-2 px-4 border-b">{doctor.rate}</td>
                <td className="py-2 px-4 border-b">
                  <Button
                    className="flex items-center justify-center bg-green-500 text-white px-4 py-3 rounded  
            bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onChange={() => {
                      dispatch(changeSelectedDoctorId(doctor._id));
                      dispatch(changePath("/doctor"));
                    }}
                    text={" Details"}
                    icon={<GrLinkNext size={20} />}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <Button
            className="flex items-center justify-center bg-green-500 text-white px-4 py-3 rounded  
            bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onChange={() => setPage(page + 1)}
            text={"Next Page"}
            icon={<MdNavigateNext size={20} />}
          />
        </div>
      </div>
    </div>
  );
}

export default Doctors;
