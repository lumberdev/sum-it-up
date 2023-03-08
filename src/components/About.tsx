import Container from "./utility-components/Container";

const About = () => {
  return (
    <Container className="border-t-2 border-light py-20 text-dark">
      <div className="mx-auto max-w-[88rem] rounded-[1rem] bg-white px-10 py-20 md:px-20">
        <h4 className="mb-8 text-center text-xl font-bold md:mb-10 md:text-heading3">ABOUT</h4>
        <p className="mb-4">
          Sum It Up is the ultimate AI tool for summarizing any text, article, or song. With its advanced algorithms and
          natural language processing capabilities, Sum It Up quickly and accurately condenses long articles, lengthy
          web pages, and even complete songs into easy-to-read summaries. Whether you&apos;re a busy professional
          looking to stay informed, a student trying to stay on top of your reading list, or just someone who wants to
          quickly understand the main points of a piece of text, Sum It Up is the perfect solution using modern AI
          (artificial intelligence).
        </p>
        <p className="mb-4">
          One of the best things about Sum It Up is how user-friendly it is. Despite the complex AI that is analyzing
          text, URLs and songs, the interface is intuitive and easy to navigate, and the tool can be used on any device
          with a web browser. Simply paste the text you want to summarize into the Sum It Up interface, and the tool
          will do the rest. You can even save summaries for later reference or share them with others.
        </p>
        <p className="mb-4">
          Another great feature of Sum It Up is its ability to summarize article content. Whether you&apos;re trying to
          get a quick overview of a news article, a product review, or a blog post, Sum It Up can condense the important
          information into a single, easy-to-read summary. This can save you a lot of time when you&apos;re trying to
          stay on top of the latest news or trends.
        </p>
        <p className="mb-4">
          Finally, Sum It Up can also be used to summarize songs using AI. Whether you&apos;re a musician looking for
          inspiration or just someone who wants to understand the main themes of a song, Sum It Up can help. With its
          advanced analysis capabilities, Sum It Up can identify the key lyrics and themes of any song, making it a
          valuable tool for anyone who wants to get a better understanding of the music they love. All in all, Sum It Up
          is the best tool for summarizing any text, article or song. Try it today and see for yourself how much time
          and effort it can save you.
        </p>
      </div>
    </Container>
  );
};

export default About;
