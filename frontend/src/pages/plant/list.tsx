import React, { useEffect, useState } from 'react'
import { Plant } from '@/types/Plant'
import PlantCard from '@/components/PlantCard/PlantCard';
import Header from '@/components/Header/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;


const mockPlant: Plant = {
  "id": 1,
  "plantName": "boogie",
  "plantType": "snake grass",
  "interval": 2,
  "frequency": "Weekly",
  "description": "second plant",
}

const ListPlants = () => {
  const [plants, setPlants] = useState<Plant[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlants = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_API}/plant`, {
        method: "GET",
        headers: { "Content-Type": "applications/json" }
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const allPlants: Plant[] = await response.json()
      console.log(`Retrieved ${allPlants.length} plants`)
      setPlants(allPlants);
    } catch (error: any) {
      console.error("Error fetching all plants", error);
      setError(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <>
      <Header></Header>
      <Container fluid className='my-5'>
        <Row>
          <Col>
            <h2 className="text-center mb-4">Your Plants 🪴</h2>
          </Col>
        </Row>
        {
          loading && <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        }
        {
          error && <p>Error: {error}</p>
        }
        {
          plants && (
            <Row>
              {plants.map((plant: Plant, index: number) => (
                <Col key={index}>
                  <PlantCard
                    id={plant.id}
                    plantName={plant.plantName}
                    plantType={plant.plantType}
                    interval={plant.interval}
                    frequency={plant.frequency}
                    description={plant.description}
                    key={index}
                  ></PlantCard>
                </Col>
              ))}
            </Row>
          )
        }
      </Container>
    </>
  )
}

export default ListPlants
