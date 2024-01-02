import team1 from "../imgs/teams/team1.png";
import team2 from "../imgs/teams/team2.png";
    const matchesDetailsData = {
      
        id: 1,
        image1: team1,
        image2: team2,
        team1: 'Al Ahly',
        team2: 'Ismaily',
        date: '2023-01-01',
        time: '20:00',
        location: 'Cairo Stadium',
        mainReferee: 'Ahmed Mohamed',
        firstLinesman: 'Mohamed Ahmed',
        secondLinesman: 'Ali Mohamed',
        price: 100,
        rows: 4,
        seatsPerRow: 10,
        seatsArray: [
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,1,1,1,1,1,1,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,1,1,1,1,1,1,0,0],
        ],
      };

export default matchesDetailsData;
