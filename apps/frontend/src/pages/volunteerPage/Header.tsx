export default function Header() {
  return (
    <div
      style={{
        padding: '0px 50px 50px',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--Foreground, #F2F2F2)',
      }}
    >
      <p
        style={{
          fontSize: '40px',
          fontWeight: 'bold',
          margin: 15,
          fontFamily: 'Montserrat',
          lineHeight: '49px',
          textAlign: 'left',
          color: 'black',
          width: '100%',
          borderBottom: '4px solid rgba(0, 0, 0, 1)',
        }}
      >
        Welcome back, Volunteer!
      </p>
    </div>
  );
}
