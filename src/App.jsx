import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [firstNamePeople, setFirstNamePeople] = useState("");
  const [lastNamePeople, setLastNamePeople] = useState("");
  const [agePeople, setAgePeople] = useState(0);
  const [talentPeople, setTalentPeople] = useState(1);
  const [data, setData] = useState([]);

  const submitHandler1 = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:4000/people", {
          firstName: firstNamePeople,
          lastName: lastNamePeople,
          age: +agePeople,
          talentId: +talentPeople,
        })
        .then(
          (response) => {
            console.log("jsonServer POST", response);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }

    try {
      await axios.get("http://localhost:4000/people", {}).then((response) => {
        const { data } = response;
        setData(data);
        console.log("jsonServer GET", data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler2 = async (e) => {
    e.preventDefault();
    const endpoint = "http://localhost:3000/graphql";
    const headers = {
      "content-type": "application/json",
    };
    const graphqlQuery = {
      operationName: "allPeople",
      query: `query allPeople { allPeople { id firstName lastName age talentId }}`,
    };

    const graphqlMutation = {
      operationName: "allPeopleMutation",
      query: `mutation allPeopleMutation{
        createPerson(
        firstName : "Messia",
             lastName: "Romario",
              age:34,
             talentId:3
         ) {
             id
           }
         }`,
      variables: data,
    };

    const optionsGet = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(graphqlQuery),
    };

    const optionsPost = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(graphqlMutation),
    };

    const responseGet = await fetch(endpoint, optionsGet);
    const dataGet = await responseGet.json();
    console.log("GET", dataGet);

    const responsePost = await fetch(endpoint, optionsPost);
    const dataPost = await responsePost.json();
    console.log("POST", dataPost);
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
        <table>
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Talent</th>
            </tr>
          </tbody>
          {
            <tbody>
              {data ? (
                data.map((player) => (
                  <tr key={player.id}>
                    <td>{player.firstName}</td>
                    <td>{player.lastName}</td>
                    <td>{player.age}</td>
                    <td>{player.talentId}</td>
                  </tr>
                ))
              ) : (
                <tr></tr>
              )}
            </tbody>
          }
        </table>
      </div>
    </div>
  );
}

export default App;
