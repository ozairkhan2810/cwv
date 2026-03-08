// Question: What will be the output? Can the context of greet be changed using .call()? Why or why not?

const profile = {
  userName: 'Vasanth',
  greet: () => {
    console.log(`Hi, I'm ${this.userName}`);
  },
  welcome: function() {
    console.log(`Welcome, ${this.userName}`);
  }
};

const friend = { userName: 'Candidate' };

profile.greet.call(friend); 
profile.welcome.call(friend);

// Output:
/**
 * 1. 'Hi, I'm undefined' because Arrow functions do not have their own THIS
 * 2. 'Welcome, Candidate'. Regular functions get THIS at call time
 */