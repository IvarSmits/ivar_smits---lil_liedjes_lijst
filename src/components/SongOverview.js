import { React, Component } from "react";
import SongList from "./SongList";
import SongForm from "./SongForm";
import SeedSongs from "../seedsongs";

class SongOverview extends Component {
  constructor() {
    super();
    this.state = {
      newSong: {
        id: null,
        title: "",
        genre: "",
        rating: 5,
        artist: "",
      },
      songs: [],
      allSongs: [],
      filters: {
        rating: "",
        genre: "",
      },
    };
  }

  componentDidMount() {
    this.seedSongs();
  }

  seedSongs = () => {
    this.setState({
      songs: SeedSongs,
      allSongs: SeedSongs,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      newSong: {
        ...prevState.newSong,
        [name]: value,
      },
    }));
  };

  handleFilters = (event) => {
    let { name, value } = event.target;
    let songs = [];

    this.setState(
      (prevState) => ({
        filters: {
          ...prevState.filters,
          [name]: value,
        },
      }),
      //Callback so we can use the state as source of truth
      // How could I make this more elegant?
      () => {
        let { genre, rating } = this.state.filters;
        if (genre == "" && rating == "") {
          // early return with our copy of all songs
          console.log("early return");
          return this.setState({ songs: this.state.allSongs });
        } else if (genre !== "" && rating == "") {
          songs = this.filterGenre(this.state.allSongs);
        } else if (rating !== "" && genre == "") {
          songs = this.filterRating(this.state.allSongs);
        } else {
          songs = this.filterRating(this.state.allSongs);
          songs = this.filterGenre(songs);
        }
        this.setState({
          songs,
        });
      }
    );
  };

  filterGenre(arr) {
    return arr.filter((item) => {
      return item.genre === this.state.filters.genre;
    });
  }

  filterRating(arr) {
    return arr.filter((item) => {
      return item.rating === parseInt(this.state.filters.rating);
    });
  }

  handleDelete = (indexToDelete) => {
    const presentationSongs = this.state.songs.filter(
      (song, index) => index !== indexToDelete
    );
    this.setState({ songs: presentationSongs });

    const songs = this.state.allSongs.filter(
      (song, index) => index !== indexToDelete
    );
    this.setState({ allSongs: songs });
  };

  addSong = (e) => {
    e.preventDefault();
    let lengthSongsArray = this.state.allSongs.length;
    this.setState((prevState) => ({
      newSong: {
        ...prevState.newSong,
        id: lengthSongsArray + 1,
      },
    }));

    //Update the songs array for the viewTable, but as a side effect also add it to the allsongs arr
    //To keep track of all (unfiltered) songs
    this.setState({ songs: [...this.state.songs, this.state.newSong] }, () => {
      this.setState(
        { allSongs: this.state.songs },
        console.log(this.state.allSongs, this.state.songs)
      );
    });

    // Clear the form fields by resetting state
    this.setState({
      newSong: {
        id: "",
        title: "",
        genre: "",
        rating: 5,
        artist: "",
      },
    });
  };

  render() {
    return (
      <div>
        <SongForm
          addSong={this.addSong}
          newSong={this.state.newSong}
          handleChange={this.handleChange}
        />
        <table>
          <thead>
            <tr className="song-header">
              <th className="song-row__item">Song</th>
              <th className="song-row__item">Artist</th>
              <th className="song-row__item">
                Genre
                <select
                  id="filter-genre"
                  name="genre"
                  class="table__select"
                  onChange={this.handleFilters}
                >
                  <option value="">Select Filter</option>
                  <option value="drum_and_bass">Drum and Bass</option>
                  <option value="punk">Punk</option>
                  <option value="hiphop">Hip Hop</option>
                  <option value="reggae">Reggae</option>
                  <option value="other">Other</option>
                  <option value="">Filter Off</option>
                </select>
              </th>
              <th className="song-row__item">
                Rating
                <select
                  id="filter-rating"
                  class="table__select"
                  name="rating"
                  onChange={this.handleFilters}
                >
                  <option value="">Select Filter</option>
                  <option value="1">*</option>
                  <option value="2">* *</option>
                  <option value="3">* * *</option>
                  <option value="4">* * * *</option>
                  <option value="5">* * * * *</option>
                  <option value="">Filter Off</option>
                </select>
              </th>
              <th className="song-row__item"></th>
            </tr>
          </thead>

          <SongList songs={this.state.songs} handleDelete={this.handleDelete} />
        </table>
      </div>
    );
  }
}

export default SongOverview;
