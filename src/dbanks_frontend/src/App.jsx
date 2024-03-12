import { useEffect, useState } from 'react';
import { dbanks_backend } from 'declarations/dbanks_backend';
import fav from "../public/favicon.ico"
function App() {
  const [greeting, setGreeting] = useState('');
  const [balance,setBalance] = useState(100);
  const [isLoading,setLoading] = useState(false)
  const [info,setInfo] = useState({
    name:"",
    amount:0
  })
  const fetchBalance = async () => {
    setLoading(true);
    try {
      const updatedBalance = await dbanks_backend.checkBalance();
      setBalance(updatedBalance);
    } catch (error) {
      console.error("Error fetching balance:", error); // Handle errors gracefully
    } finally {
      setLoading(false);
    }
  }
  function handleChange(event){
    const {name,value} = event.target;
    
    const info = {
      name:name,
      amount:value
    }
    setInfo(info)
  }
  async function handleSubmit(event){
    event.preventDefault();
    setLoading(true)
    const amount = parseFloat(info.amount)
    try{
      if(info.amount!=0){
        if(info.name === "topup"){
          try{
           await dbanks_backend.topUp(amount);
           console.log("Added successfully");
          }catch(err){
           console.log(err);
          }
         }else if(info.name==="withdraw"){
           try{
             await dbanks_backend.withDraw(amount);
             
             console.log("Withdrawl");
           }catch(err){
             console.log(err);
           }
         }
      }
    }catch(err){
      console.log(err);
    }finally{
      fetchBalance()
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchBalance();
  }, []);
  return (
    <main>
      <div class="main">
        <img  src={fav} width="100px" height="100px"/>
        <p id="balance">Current Balance : ${balance}</p>
        <hr/>
        <form onSubmit={handleSubmit}>
          <label for="">Amount to Top Up</label>
          <input type="text" name="topup" id="" onChange={handleChange}/>
          <label for="">Amount to withdrawl</label>
          <input type="text" name="withdraw" id="" onChange={handleChange}/>
          <input type="submit" disabled={isLoading} value="Finalise Transaction" />
        </form>
      </div>
    </main>
  );
}

export default App;
