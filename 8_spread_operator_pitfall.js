
const state = {
    user: { id: 101, details: { city: 'Bangalore' } },
    theme: 'dark'
};

const newState = { ...state };
newState.user.details.city = 'Chennai';

console.log(state.user.details.city);

/*

Question:** What will be logged? How do you fix this using the spread operator while keeping the code readable?
Why did it change?"

Answer:
'Chennai' is logged because newState is shallow copied. Shallow copy copies only first level and copies reference to nested objects.

Fix:

*/

const state1 = {
    user: { id: 101, details: { city: 'Bangalore' } },
    theme: 'dark'
};

const newState1 = {
    ...state1,
    user: {
        ...state1.user,
        details: {
            ...state1.user.details
        }
    }
};
newState1.user.details.city = 'Chennai';

console.log(state1.user.details.city); // Bangalore
