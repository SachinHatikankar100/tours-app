import { useEffect,useState } from "react";
import Tours from './Tours';
import Loading from "./Loading";
const url = 'https://course-api.com/react-tours-project';
function App() {
    const [isloading,setIsLoading] = useState(true);
    const [tours,setTours] = useState([]);

const removeTour = (id)=>{
  const newTours = tours.filter((tour)=> tour.id !== id);
  setTours(newTours);
}

    const fetchTours = async () => {
      setIsLoading(true);
      try {
          const response = await fetch(url);
          const tours = await response.json();
          setTours(tours);
      } catch (error) {
          console.log(error);
      }
      setIsLoading(false);
  }

  useEffect(()=>{
      fetchTours();
  },[]);
  if(isloading){
    return<main>
      <Loading/>
    </main>
  }

  if(tours.length===0){
    return<main>
      <div className="title">
        <h2>No tours found</h2>
      <button type="button" style={{marginTop:'2rem'}} className="btn" onClick={()=>fetchTours()}>Refresh</button>
      </div>
    </main>
  }
  return (
    <>
      <Tours tours={tours} removeTour={removeTour}/>
    </>
  )
}

export default App
