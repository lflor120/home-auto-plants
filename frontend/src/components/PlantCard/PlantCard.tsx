import React from 'react';
import { Plant } from '@/types/Plant';
import Card from 'react-bootstrap/Card';

const PlantCard: React.FC<Plant> = ({ id, plantName, plantType, interval, frequency, description }) => {
  return (
    <Card style={{ width: "18rem", margin: "1rem" }}>
      <Card.Body>
        <Card.Title>{plantName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{plantType}</Card.Subtitle>
        <Card.Text>
          {description}
        </Card.Text>
        <Card.Text>
          This plant gets watered {frequency} times {interval}.
        </Card.Text>
        <Card.Link href="#">Edit</Card.Link>
        <Card.Link href="#">Delete</Card.Link>
      </Card.Body>
    </Card>
  )
}

export default PlantCard;
