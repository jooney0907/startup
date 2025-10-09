import React from "react";
import { NavLink } from "react-router-dom";


export function Scores() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <table className="table table-dark table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Sangjoon</td>
            <td>21</td>
            <td>September 28, 2025</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Daniel</td>
            <td>29</td>
            <td>June 2, 2021</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Carlos</td>
            <td>15</td>
            <td>July 3, 2020</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Weeee</td>
            <td>7</td>
            <td>May 7, 2010</td>
          </tr>
        </tbody>
      </table>

      <NavLink to="/" className="btn btn-light">
        New Game
      </NavLink>
    </main>
  );
}

