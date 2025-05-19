# MISO System Digital Twin

A digital twin prototype for MISO (Multiple-Input Single-Output) systems that monitors eavesdropping and visualizes different secrecy rate figures. This project integrates Docker Compose, FIWARE, NiFi, and a React UI with dashboards.

## Context

The MISO System Digital Twin is designed to model and visualize the security aspects of wireless communication systems, specifically focusing on physical layer security through secrecy rate analysis. It simulates a scenario where an eavesdropper attempts to intercept communications between legitimate devices in a MISO (Multiple-Input Single-Output) wireless system.

Key concepts:
- **MISO**: Multiple-Input Single-Output - a wireless communication system where the transmitter has multiple antennas and the receiver has a single antenna
- **Secrecy Rate**: A measure of the maximum rate at which information can be reliably transmitted while ensuring confidentiality from eavesdroppers
- **Eavesdropping**: Unauthorized interception of communications between legitimate users
- **CSI**: Channel State Information - characterizes the signal propagation between transmitters and receivers

## JSON Data Models

The system uses static JSON files for CSI (Channel State Information) with secrecy rate information. The primary data model structure is as follows:

```json
{
  "metadata": {
    "description": "Sample Channel State Information (CSI) data for MISO system",
    "version": "1.0.0",
    "created": "2025-03-14T12:00:00Z",
    "scenario": "Urban environment with mobile eavesdropper"
  },
  "system_parameters": {
    "num_transmit_antennas": 4,
    "num_receive_antennas": 1,
    "carrier_frequency": 2.4,
    "bandwidth": 20,
    "noise_figure": 7,
    "transmit_power": 23
  },
  "channel_data": [
    {
      "timestamp": "2025-03-14T12:00:00Z",
      "legitimate_channel": {
        "h": [[0.8432 + 0.5372j], [...], ...],
        "snr": 18.7,
        "path_loss": 83.2
      },
      "eavesdropper_channel": {
        "h": [[0.3214 - 0.2341j], [...], ...],
        "snr": 12.3,
        "path_loss": 92.6
      },
      "secrecy_metrics": {
        "secrecy_rate": 2.14,
        "secrecy_outage_probability": 0.12,
        "secrecy_capacity": 2.87
      }
    }
  ],
  "eavesdropping_events": [
    {
      "timestamp": "2025-03-14T12:02:00Z",
      "detection_confidence": 0.83,
      "type": "passive",
      "estimated_location": {
        "distance": 45.3,
        "angle": 127.8
      },
      "impact_on_secrecy": "moderate"
    }
  ]
}
```

## Installation with Docker Compose

The project is designed to be easily installed and run using Docker Compose. The architecture includes several containers that work together:

- **MongoDB**: Database for storing the context data
- **Orion Context Broker**: FIWARE component for context data management
- **IoT Agent**: FIWARE component for IoT device integration
- **NiFi**: Data flow tool for processing CSI data
- **Frontend**: React-based UI for visualization

### docker-compose.yml Explanation

The Docker Compose file defines all services and their configuration:

- **Orion Context Broker**: Configured to connect to MongoDB and expose port 1026
- **MongoDB**: Configured with persistent volume for data storage
- **IoT Agent**: Configured to connect to both MongoDB and Orion
- **NiFi**: Configured with custom flow definition and data volume for processing
- **Frontend**: React application served via Nginx with proxying to backend services

## How to Launch the Application

To launch the application, follow these steps:

1. Clone the repository:
   ```bash
   git clone <[repository-url](https://github.com/HiggsCorleone/Digital-twin---oussema-jebali.git)>
   cd miso-digital-twin
   ```

2. Launch the system with Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Access the UI:
   - Open your browser and navigate to `http://localhost:3000`

4. Access individual services:
   - Orion Context Broker: `http://localhost:1026/version`
   - NiFi UI: `http://localhost:8080/nifi`

5. Monitor the system:
   - Navigate to the System Status page in the UI to see the health of all components
   - Check logs with `docker-compose logs -f`

## Using the Application

The application provides several key features:

1. **Dashboard**: Overview of system status, secrecy rates, and eavesdropping detection
2. **Secrecy Rates**: Detailed analysis with multiple visualization options
3. **System Status**: Health monitoring for all system components
4. **Settings**: Configuration options for the system

To analyze secrecy rates:
1. Navigate to the "Secrecy Rates" page
2. Select a scenario from the dropdown
3. Choose your preferred visualization (line, bar, scatter, or combined)
4. Export data as needed

To monitor for eavesdropping:
1. Check the Dashboard for any detected events
2. Review security status cards for threat levels
3. Navigate to System Status for more detailed information

## Notes

- This is a prototype application for demonstration purposes
- It uses static JSON files to simulate real-time CSI and secrecy rate data
- The actual secrecy rate calculations would typically be performed through more sophisticated signal processing techniques
- In a real-world scenario, this would be connected to actual MISO hardware systems
