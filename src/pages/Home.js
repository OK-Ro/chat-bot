import React from "react";
import styled from "styled-components";
import AliceContent from "../components/AliceContent";

const Container = styled.div`
  min-height: 100vh;
  width: 40vw;
  background: linear-gradient(180deg, #1a1a1a 0%, #2c2c2c 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`;

const Logo = styled.img`
  width: 4vw;
  height: auto;
`;

const TitleContainer = styled.div`
  text-align: center;
  flex-grow: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
  color: #ffffff;
  margin-top: 10px;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Main = styled.main`
  max-width: 1200px;
  width: 100%;
`;

const Section = styled.section`
  background: #3a3a3a;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    margin-bottom: 30px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
`;

const Card = styled.div`
  background: #4e4e4e;
  border-radius: 32px;
  display: flex;
  height: 51vh;
  align-items: center;
  padding: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 15px;
  width: 100%;

  @media (min-width: 768px) {
    margin-bottom: 20px;
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
