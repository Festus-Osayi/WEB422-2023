import React from 'react'
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/router'
import PageHeader from '@/components/PageHeader'
import Map from "@/components/Map"; // will import components/Map/index.js




export async function getStaticPaths() {


  return {
    paths: [
      { params: { id: "572bb8222b288919b68abf5a" } },
      { params: { id: "572bb8222b288919b68abf5b" } },
      { params: { id: "572bb8222b288919b68abf5c" } },
      { params: { id: "572bb8222b288919b68abf5d" } },
      { params: { id: "572bb8222b288919b68abf5e" } },
      { params: { id: "572bb8222b288919b68abf5f" } },
      { params: { id: "572bb8222b288919b68abf60" } },
      { params: { id: "572bb8222b288919b68abf61" } },
      { params: { id: "572bb8222b288919b68abf62" } },
      { params: { id: "572bb8222b288919b68abf63" } }

    ], fallback: "blocking",// if new paths not returned by getStaticPaths, the function will wait for the HTML to be generated, identical to SSR
  };
}

/**
 * an asynchronous function
 * @param {*} context 
 * and use Fetch API with the URI
 */
export async function getStaticProps(context) {

  const res = await fetch(`https://combative-pike-pleat.cyclic.app/api/trips/${context.params.id}`)
  const data = await res.json()


  return { props: { post: data } }


}

const Trip = (props) => {
  

  /**
   * todo: check the value of the trip data passed in through props. 
   * If trip data is null or undefined (ie: "falsy"), return null 
   * Otherwise, render the trip data as specified below:
   */

  if (!props.post) {
    return null
  }
  else {
    return (
      <>
        <br />
        <br />
       
        
        <PageHeader title={`Bike: ${props.post.bikeid}`} text={`${props.post['start station name']} - ${props.post['end station name']}`} usertype={props.post.usertype} />

        <br />
        
        <Map
         {...props.post}
        />

        <br/>
        <ul>
          <li><strong>Trip Duration: </strong>{props.post.tripduration}</li>
          <li><strong>Birth Year: </strong>{props.post['birth year']}</li>
          <li><strong>Start Time: </strong>{props.post['start time']}</li>
          <li><strong>Stop Time: </strong>{props.post['stop time']}</li>
        </ul>


      </>
    )

  }




}

export default Trip