import { useState } from 'react'
import { Button, TextField, TableContainer,TableBody,TableCell,Table, Paper ,TableHead,TableRow} from '@mui/material'
import './App.css'


function App() {
  const [rows, setRows]=useState([])
  const [x, setX]=useState()
  const [y, setY]=useState()
  
  const sumXY = rows.reduce((sum, { x, y }) => sum + x * y, 0);

  const sumX = rows.reduce((sum, { x }) => sum + x, 0);

  const sumY = rows.reduce((sum, { y }) => sum + y, 0);

  const sumX2 = rows.reduce((sum, { x }) => sum + x ** 2, 0);

  const promedio = (variable) => {
    const n = rows.length;
    const total = {
      x: sumX,
      y: sumY,
    }[variable];

    return n == 0 ? 0 : Number((total / n).toFixed(4));
  };

  const sumxX = rows.reduce((sum, { x }) => sum + (x - promedio("x")), 0);

  const sumyY = rows.reduce((sum, { y }) => sum + (y - promedio("y")), 0);

  const sumxX2 = rows.reduce((sum, { x }) => sum + (x - promedio("x")) ** 2, 0);

  const sumyY2 = rows.reduce((sum, { y }) => sum + (y - promedio("y")) ** 2, 0);

  const sumxXyY = rows.reduce(
    (sum, { x, y }) => sum + (x - promedio("x")) * (y - promedio("y")),
    0
  );

  const get_a = () => {
    const n = rows.length;
    const nom = n * sumXY - sumX * sumY;
    const den = n * sumX2 - sumX ** 2;

    return nom / den;
  };

  const get_b = () => {
    const n = rows.length;

    return (sumY - get_a() * sumX) / n;
  };

  const get_r = () => {
    const den = Math.sqrt(sumxX2) * Math.sqrt(sumyY2);

    return Number((sumxXyY / den).toFixed(4));
  };
  
  const handdleSubmit= () => {
    if (!x || !y) return;

    setRows([...rows, { x, y }]);
  }
  
  return (
    <main style={{
      display: 'inline-flex',
      flexDirection: 'column',
      gap:'25px'
    }}>
      
      <h1>REGRESIÓN Y CORRELACIÓN</h1>
      <TextField  label="Ingrese X" onChange={(e)=> setX(+e.target.value)}></TextField>
      <TextField  label="Ingrese Y" onChange={(e)=> setY(+e.target.value)}></TextField>
      <Button variant='contained' onClick={handdleSubmit}
       style={{
        backgroundColor: "indigo",
        borderRadius: "25px"
      }}> Ingresar fila </Button>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>X</TableCell>
              <TableCell>Y</TableCell>
              <TableCell>XY</TableCell>
              <TableCell>X^2</TableCell>
              <TableCell>X-X̅</TableCell>
              <TableCell>Y-Ȳ</TableCell>
              <TableCell>(X-X̅)(Y-Ȳ)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({x,y},i)=>{
              const xX= x - promedio("x")
              const yY= y - promedio("y")
              
              return (
                <TableRow key={i}>
                  <TableCell>{x}</TableCell>
                  <TableCell>{y}</TableCell>
                  <TableCell>{x * y}</TableCell>
                  <TableCell>{x ** 2}</TableCell>
                  <TableCell>{xX}</TableCell>
                  <TableCell>{yY}</TableCell>
                  <TableCell>{xX*yY}</TableCell>
                </TableRow>
                
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
        <div style={{
          backgroundColor:"indigo",
          color: "#FFFFFF",
          textAlign: "center",
          borderRadius: "20px"
        }}>
          r: {get_r()}
        </div>

        
        <div style={{
        backgroundColor:"indigo",
        color: "#FFFFFF",
        textAlign: "center",
        borderRadius: "20px"
      }}> y':{get_a()}X + {get_b()}
      </div>
         
       
    </main>
  )
}

export default App
