import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [firstNamePeople, setFirstNamePeople] = useState("");
  const [lastNamePeople, setLastNamePeople] = useState("");
  const [agePeople, setAgePeople] = useState(0);
  const [talentPeople, setTalentPeople] = useState(1);
  let result;

  const submitHandler1 = async (e) => {
    e.preventDefault();

    const firstName = firstNamePeople;
    const lastName = lastNamePeople;
    const age = Number(agePeople);
    const talentId = Number(talentPeople);

    try {
      await axios
        .post("http://localhost:4000/people", {
          firstName,
          lastName,
          age,
          talentId,
        })
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }

    try {
      await axios.get("http://localhost:4000/people", {}).then(
        (response) => {
          result = response;
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler2 = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:3000", {}).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler3 = async (e) => {
    e.preventDefault();

    try {
      await axios.get("http://localhost:8080", {}).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  //Butonul asta trebuie sa creeze un tabel mai jos cu datele pe care le avem primite de la server
  const submitHandler4 = async (e) => {};

  return (
    <div className="App">
      <form>
        <table>
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Talent</th>
            </tr>
            <tr>
              <td>
                <input
                  className="firstName"
                  type="text"
                  placeholder="First Name"
                  value={firstNamePeople}
                  onChange={(e) => setFirstNamePeople(e.target.value)}
                />
              </td>
              <td>
                <input
                  className="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={lastNamePeople}
                  onChange={(e) => setLastNamePeople(e.target.value)}
                />
              </td>
              <td>
                <input
                  className="age"
                  type="number"
                  value={agePeople}
                  onChange={(e) => setAgePeople(e.target.value)}
                />
              </td>
              <td>
                <input
                  className="talent"
                  type="number"
                  value={talentPeople}
                  onChange={(e) => setTalentPeople(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <div>
          <button className="button1" onClick={submitHandler1} type="submit">
            1
          </button>
          <button className="button2" onClick={submitHandler2} type="submit">
            2
          </button>
          <button className="button3" onClick={submitHandler3} type="submit">
            3
          </button>
        </div>
      </form>
      <br></br>
      <br></br>
      <div>
        <button className="button4" onClick={submitHandler4}>
          Verifica obiectul primit de la butonul 1
        </button>
        <br></br>
        <br></br>
        <table>
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Talent</th>
            </tr>
          </tbody>
          {/* <tbody>
            {result.data.map((id) => (
              <tr>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.age}</td>
                <td>{data.talentId}</td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </div>
  );
}

export default App;
