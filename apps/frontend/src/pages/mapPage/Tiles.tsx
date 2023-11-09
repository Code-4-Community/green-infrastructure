import FlippableTile from './FlippableTile';

const cards = [
    {
      id: "0",
      front: "Submit a Maintenance Report",
      back: "Back"
    },
    {
      id: "1",
      front: "Click 1",
      back: "Back"
    },
    {
      id: "2",
      front: "Adapt a GI Feature",
      back: "Back"
    },
    {
      id: "3",
      front: "Click3",
      back: "Back"
    },
    {
      id: "4",
      front: "Submit a Condition Assessment",
      back: "Back"
    },
    {
      id: "5",
      front: "Click5",
      back: "Back"
    },
  ];
  
  export default function App() {
    return (
      <div className="resources" style={{
          display: 'flex',
          padding: '20px 40px',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '15px',
          flexShrink: '0',
          background: 'white',
      }}>
        <p style={{
          color: 'var(--Text-Primary, #091F2F)',
          fontFamily: 'Montserrat',
          fontSize: '27px',
          fontStyle: 'bold',
          fontWeight: '1000',
          lineHeight: 'normal',
          textDecorationLine: 'underline',
          margin: '0'
        }}>
          <u>FEATURES RESOURCES &#8594</u></p>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-auto text-center">
                    {cards.slice(0, 2).map((card) => (
                        <FlippableTile key={card.id} card={card} />
                    ))}
                </div>
            <div className="col-md-auto text-center">
                    {cards.slice(2, 4).map((card) => (
                        <FlippableTile key={card.id} card={card} />
                    ))}
            </div>
            <div className="col-md-auto text-center">
                    {cards.slice(4, 6).map((card) => (
                        <FlippableTile key={card.id} card={card} />
                    ))}
            </div>
        </div>
      </div>
      </div>
    );
  }