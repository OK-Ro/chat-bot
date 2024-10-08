import React from "react";
import styled from "styled-components";
import AliceContent from "../components/AliceContent";

const Container = styled.div`
  min-height: 100vh;
  width: 90vw;
  max-width: 800px;
  background: linear-gradient(180deg, #101010 0%, #181818 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
  color: #fff; // Set a default text color

  @media (max-width: 768px) {
    padding: 40px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("https://www.transparenttextures.com/patterns/black-paper.png"),
      rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
  z-index: 2;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const Logo = styled.img`
  width: 90px;
  height: auto;

  @media (max-width: 768px) {
    width: 70px;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  flex-grow: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #00ffcc;
  text-shadow: 0 0 5px rgba(0, 255, 204, 0.8); // Glowing effect

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
  color: #ffffff;
  margin-top: 10px;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3); // Soft glowing effect

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Main = styled.main`
  max-width: 1200px;
  width: 100%;
  z-index: 2;
`;

const Section = styled.section`
  background: rgba(58, 58, 58, 0.9); // Slightly transparent background
  border-radius: 34px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px); // Blur effect for a glassmorphism style

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #00ffcc;
  text-shadow: 0 0 5px rgba(0, 255, 204, 0.8);
`;

const Card = styled.div`
  background: rgba(78, 78, 78, 0.9);
  border-radius: 32px;
  display: flex;
  height: 51vh;
  align-items: center;
  padding: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 15px;
  width: 100%;
  transition: transform 0.3s; // Smooth hover effect

  &:hover {
    transform: scale(1.02); // Slight scaling effect on hover
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
    height: auto;
  }
`;

const Home = () => {
  return (
    <Container>
      <Header>
        <Logo
          src="https://static.vecteezy.com/system/resources/previews/012/628/411/original/chatbot-3d-render-icon-illustration-png.png"
          alt="AI Logo"
        />
        <TitleContainer>
          <Title>Alice</Title>
          <SubTitle>Your Personal AI Assistant</SubTitle>
        </TitleContainer>
      </Header>

      <Main>
        <Section>
          <SectionTitle>How Can I Help You Today?</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <AliceContent />
            </Card>
          </div>
        </Section>
      </Main>
    </Container>
  );
};

export default Home;
