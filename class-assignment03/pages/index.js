
import HelloWorld from '../components/Helloworld'
import Clock from '../components/Clock'

export default function Home() {
  return (
    <div>
      <h1>
        <HelloWorld />
      </h1>

      <h2>The Clock Component</h2>
      <p>Week 3 - Component: Adding "state" and Using Hooks - useState, useEffect</p>
      <Clock locale="en-CA" />
      <hr />
    </div>
  )
}
