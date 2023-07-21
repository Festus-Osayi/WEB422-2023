import React from 'react'
import { useRouter } from 'next/router'
import { ListGroup, Button, Card, Container } from 'react-bootstrap'
import styles from '../styles/Home.module.css'
import { useSearchHistoryState } from '@/store'


const history = () => {
  const [searchHistory, setSearchHistory] = useSearchHistoryState()
  let parsedHistory = [];
  /** router to navigate to the specified route */
  const router = useRouter()

  /** generate a list of "parsed" search queries */
  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  /**
   *  a function called "historyClicked" that takes two parameters: 
   * e(the event) and index(a number).
   * This function must cause the user to navigate
   * (using the "useRouter" hook) to the page 
   */

  const historyClicked = (e, index) => {
    e.preventDefault()
    router.push(`/artwork?${searchHistory[index]}`)
  }

  /**
   * to remove an element from the "searchHistory" list
   */

  const removeHistoryClicked = (e, index) => {
    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory(current => {
      let x = [...current];
      x.splice(index, 1)
      return x;
    });

  }

  /**	
   * The component must render the "parsedHistory" (created above) in
   * the component
   * within the React ListGroup
  */
  
  return(
    <>
      {parsedHistory.length === 0 ? (
        <Card style={{marginTop: '5rem'}}>
          <Card.Body>
            <Card.Text style={{ fontWeight: 'semi-bold', fontSize: "1.5rem", margin: 0 }}>
              Nothing Here
            </Card.Text>
            <Card.Text style={{ fontSize: "1.2rem", margin: 0 }}>
              Try searching for something else
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup style={{ marginTop: '4.5rem' }}>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              className={styles.historyListItem} 
              onClick={(e) => historyClicked(e, index)} 
            >
              {Object.keys(historyItem).map((key) => (
                <>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>

              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)} 
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>

  )
  




}

export default history