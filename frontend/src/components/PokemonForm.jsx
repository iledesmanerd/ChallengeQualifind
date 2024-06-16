import React from 'react';
import { Form, Button, Container, Spinner, Card } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePokemonForm from '../hooks/usePokemonForm';

const PokemonForm = () => {
    const {
        name,
        setName,
        type,
        setType,
        level,
        setLevel,
        isLoading,
        handleSubmit,
    } = usePokemonForm(); 

    return (
        <Container 
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: '100vh', backgroundColor: '#f0f8ff' }}
        >
            <Card 
                style={{ width: '100%', maxWidth: '400px', padding: '20px', borderRadius: '10px' }}
                className="shadow"
            >
                <Card.Body>
                    <Card.Title className="text-center" style={{ color: '#ff6347' }}>Create a Pokémon</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formPokemonName" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Pokémon name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPokemonType" className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Pokémon type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                disabled={isLoading}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPokemonHp" className="mb-3">
                            <Form.Label>Level</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Pokémon Level"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                disabled={isLoading}
                            />
                        </Form.Group>

                        <Button 
                            variant="danger" 
                            type="submit" 
                            disabled={isLoading} 
                            className="w-100"
                        >
                            {isLoading ? (
                                <Spinner 
                                    as="span" 
                                    animation="border" 
                                    size="sm" 
                                    role="status" 
                                    aria-hidden="true" 
                                /> 
                            ) : 'Create Pokémon'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <ToastContainer />
        </Container>
    );
};

export default PokemonForm;
