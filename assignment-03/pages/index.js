'use strict'
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import useSWR from 'swr'
import { Pagination, Table } from "react-bootstrap"
import PageHeader from '@/components/PageHeader'
import { useRouter } from 'next/router'


export default function Home() {
  /**
   * todo: Next, add the following state values to the component:  
   *  page(default value: 1) 
   *  pageData (default value: [])
   * 
   */
  const [page = 1, setPage] = useState(1)
  const [pageData = [], setPageData] = useState()

  /** 
   * To navigate to a specific trip when an item is clicked 
  */
  const router = useRouter()

  /**
   * todo: functionality for the next page
   */
  function previousPage() {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  /**
   * todo: functionality for the next page
   */
  function nextPage() {
    if (page >= 1) {
      setPage(page + 1)
    }
  }

  /**
   * todo: fetch the data from the (Cyclic URL) with SWR
   */

  const fetcher = (url) => fetch(url).then(response => response.json())
  const { data, error } = useSWR(`https://combative-pike-pleat.cyclic.app/api/trips?page=${page}&perPage=10`, fetcher);

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);


  return (
    <>
      <br />
      <br />
      <PageHeader title='Trips List' text='Full list of Citibike Trips' showSubscriber={true} showCustomer={true} />
      <br />
      {/* display the trips data in a tabular format */}
      <Table bordered hover className="table">
        <thead>
          <tr>
            <th >Bike ID</th>
            <th>Start Station</th>
            <th>End Station</th>
            <th>Duration(Minutes)</th>
          </tr>
        </thead>
        <tbody>
          {
            pageData.map((trips, index) =>
              <tr
                key={index}
                id={trips.usertype}
                onClick={() => { router.push(`/trip/${trips._id}`) }}>


                <td style={{ backgroundColor: trips.usertype === 'Subscriber' ? 'yellow' : 'orange' }}>{trips?.bikeid}</td>
                <td style={{ backgroundColor: trips.usertype === 'Subscriber' ? 'yellow' : 'orange' }}>{trips?.['start station name']}</td>
                <td style={{ backgroundColor: trips.usertype === 'Subscriber' ? 'yellow' : 'orange' }}>{trips?.['end station name']}</td>
                <td style={{ backgroundColor: trips.usertype === 'Subscriber' ? 'yellow' : 'orange' }}>{(trips?.tripduration / 60).toFixed(2)}</td>
              </tr>
            )
          }
        </tbody>
      </Table>

      {/* pagination */}

      <Pagination>
        <Pagination.Prev onClick={previousPage} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={nextPage} />
      </Pagination>

    </>
  )
}
