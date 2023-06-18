'use strict'
import React from 'react'
import PageHeader from '@/components/PageHeader'
import Map from "@/components/Map"; // will import components/Map/index.js
import { Container, Card, Row, Col } from "react-bootstrap"

/**
 * todo: create and update the Map Ui with
 * Seneca College
 */
const trip = {
  'start station location': { type: 'Point', coordinates: [-79.34943616, 43.79514851] },
  'end station location': { type: 'Point', coordinates: [-79.36750352, 43.85012304] },
  'start station name': 'Seneca College Newham Campus',
  'end station name': 'Seneca College Markham Campus',


}

const senecaInfo = {
  title: 'Seneca Polytechnic College Newham Campus',
  senecaText: 'Seneca College of Applied Arts and Technology, operating as Seneca Polytechnic. is a multiple-campus public college in the Greater Toronto Area, and Peterborough, Ontario, Canada regions. It offers full-time and part-time programs at the baccalaureate, diploma, certificate, and graduate levels.',
  address: '1750 Finch Ave E, North York, ON M2J 2X5',
  phone: '(416) 491-5050',
  unTuitionFee: '2,686 CAD, International tuition 11,970 CAD (2014 – 15)',
  totalEnrollment: '97,500 (2014)',
  president: 'David Agnew',
  mascot: 'Sammy Sting',
  founded: '1967'
}
const about = () => {

  return (
    <>

      <br />
      <br />
      <PageHeader title='About' text='All about me - the developer.' />
      <br />
      <br />
      <p> Hello everyone I am Festus Osayi, originally from Nigeria, and I am currently attending Seneca College to pursue a career in computer programming. Additionally, I am open to both full-time and part-time employment and am seeking for an internship. Additionally, I am learning React and the full functional programs of React, </p>

      <br />
      {/* Seneca College */}

      



      <Container fluid={true}>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <div style={{ display: 'flex', width: '100%' }}>
                  <div style={{ flex: 1 }}>
                    <Card.Title>{senecaInfo.title}</Card.Title>
                    <Card.Text>{senecaInfo.senecaText}</Card.Text>
                    <Card.Text>{senecaInfo.address}</Card.Text>
                    <Card.Text>{senecaInfo.phone}</Card.Text>
                    <Card.Text>{senecaInfo.unTuitionFee}</Card.Text>
                    <Card.Text>
                      <strong>Total enrollment: </strong>
                      {senecaInfo.totalEnrollment}
                    </Card.Text>
                    <Card.Text>{senecaInfo.president}</Card.Text>
                    <Card.Text>{senecaInfo.mascot}</Card.Text>
                    <Card.Text>{senecaInfo.founded}</Card.Text>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Map {...trip} />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default about