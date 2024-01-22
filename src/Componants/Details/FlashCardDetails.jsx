import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RiArrowGoBackLine } from "react-icons/ri";
import { MdDownload, MdPrint } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import Tab from "../../assets/tab.jpg";
import { Pagination } from "./pagination/Pagination";

const FlashCardDetails = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const cards = useSelector((state) => state.flashcard.flashcards);
  const [myCard, setMyCard] = useState({});
  const [flashcard, setFlashcard] = useState({});

  //pagination
  const CardArray = [];
  myCard.cards && myCard.cards.map((e) => CardArray.push(e));

  const [currentPage, setCurrentPage] = useState(1);
  const [cardPerPage] = useState(6);

  // Get current cards
  const indexOfLastCard = currentPage * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;
  const currentCard = CardArray.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // This function will set the Display card which will be selected by the user from the left side menu
  const displayCard = (id) => {
    const showFlashcard = myCard.cards.filter((c) => c.card_id === id);
    setFlashcard(showFlashcard[0]);
  };

  useEffect(() => {
    if (!groupId || !cards) return;
    // Filters the user-selected card from the Cards from the store
    const temp = cards.filter((c) => c.card.group_id === groupId);
    setMyCard(temp[0].card);
  }, [groupId]);

  useEffect(() => {
    if (myCard.cards) {
      setFlashcard(myCard.cards[0]);
    }
  }, [myCard]);

  return (
    <div className="flex flex-col text-slate-600">
      {/* Header Section */}
      <div className="flex">
        {/* Back Button */}
        <BiArrowBack
          className="text-3xl mr-6 cursor-pointer"
          title="Back"
          onClick={() => navigate(-1)}
        />
        {/* Group Name and Description */}
        <div className="flex flex-col">
          <h2 className="text-xl text-black font-bold">{myCard.group_name}</h2>
          {myCard.group_description && (
            <p className="my-2">{myCard.group_description}</p>
          )}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="mt-6 md:grid grid-rows-1 grid-cols-4">
        {/* Flashcards List */}
        <div className="mr-5 mb-5 col-span-1 bg-white h-fit rounded-md shadow-lg ">
          <h2 className="p-2 "><b>Flashcards</b></h2>
          <hr />
          <hr className="mb-2" />
          {/* Mapping through currentCard to display flashcards */}
          {currentCard.map((card) => (
            <p
              title={`${card.card_name}`}
              key={card.card_id}
              className={`py-2 px-7 text-slate-700 font-medium hover:bg-slate-100 cursor-pointer ${
                card.card_id === flashcard.card_id && "!text-red-500 !font-bold"
              }`}
              onClick={() => displayCard(card.card_id)}
            >
              {card.card_name}
            </p>
          ))}
        </div>

        {/* Displaying Selected Flashcard */}
        <div className="mb-5 col-span-3 md:col-span-2 flex  l:flex-row items-center w-full bg-white shadow-lg rounded-lg">
          {/* Displaying Flashcard Image */}
          {flashcard.card_image ? (
            <img
              src={flashcard.card_image}
              alt="card_image"
              className="object-contain md:w-[20vw] p-6  h-full"
            />
          ) : (
            <img
              src={Tab}
              alt="card_image"
              className="object-contain md:w-[20vw] p-6 w-[32rem] h-full"
            />
          )}

          {/* Displaying Flashcard Description */}
          <p className="p-5 py-6 md:w-full">{flashcard.card_description}</p>
        </div>
      </div>

      {/* Pagination Component */}
      <div className="ml-[44%]">
        <Pagination
          cardsPerPage={cardPerPage}
          totalCards={CardArray.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default FlashCardDetails;
