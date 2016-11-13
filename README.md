## Typewars

### GamePlay

Typewars is a keyboard interaction focused twist on classical arcade shooting games like space invaders.
Users will have to type the correct work in order to destroy incoming enemy ships.

#### Functionality & MVP  

With Typewars users will be able to:

- [ ] Start and pause the game
- [ ] Type in letters and target the ship holding them
- [ ] Audio and visual feedback when a typo is being commited 
- [ ] Progressive increase of difficulty as the game advances 

In addition, this project will include:

- [ ] An Instructions modal describing the rules of the game
- [ ] A production Readme
- [ ] Difficulty setting select (Bonus Feature)


### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn,
and the Instructions modal.  Game controls will include Start, Stop and Mute buttons 

![wireframes](https://github.com/appacademy/job-search-curriculum/blob/master/job-search-projects/images/js_wireframe.jpeg)

### Architecture and Technologies

This project will utilize the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`canon.js`: this script will handle the user interaction logic. This class will determine the succes or failure of the word being typed

`bullets.js`: this script will house the logic for creating bullet objects.

`enemy.js`: this script will determine the amount of incoming ships. It will also assure no two ships begin with the same letter

### Implementation Timeline

**Day 1**: Render elements on the page

- Learn enough Easel.js to succesfully display element images on the game board


**Day 2**: Create logic for incoming enemy waves

- Complete enemy.js logic which assures different first letters are used for all incoming objects
- Use only up to 6 letter words for the first 10 levels
- Evenly randomize the length and difficulty of words
- Once a target is locked all other ships should ignore keyboard input

**Day 3**: Register user keyboard interaction 

- Target correct enemy ship upon user typing
- Shoot a bullet for each correct letter
- Shift ships position to be in line with targeted ship
- Recognize typos


**Day 4**: Destroy ships on succesful type. Add sound and visual effects. Polish looks

- Destroy ships on succesful type
- Add audio and visual explosion effect when enemy is hit
- Have a styled `Canvas`, nice looking controls and title
- If time: include difficulty selector


### Bonus features

Some additional ideas

- [ ] Add different kind of ships. Longer words are held by bigger ships with different attack skills
- [ ] Add power ons
