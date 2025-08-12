export default {
    indexScreen: {
        paragraph: 'Immerse yourself in an endless adventure with ',

        button: 'Dive in ->',
    },
    signInScreen: {
        header: 'Sign in to ',

        emailPlaceholderText: 'Email...',
        passwordPlaceholderText: 'Password...',

        button: 'Sign In',

        text1: "Don't have an account yet? ",
        text2: 'Sign up.',

        errorMessage: 'Wrong e-mail or password.'
    },
    signUpScreen: {
        header1: 'Create your ',
        header2: '  account',

        emailPlaceholderText: 'Email...',
        usernamePlaceholderText: 'Username...',
        passwordPlaceholderText: 'Password...',

        button: 'Sign Up',

        text1: 'Already have an account? ',
        text2: 'Sign in.'
    },
    homeScreen: {
        header: "What’s new in ",        
        searchBarPlaceholderText: 'Search recipes...',

        text1: 'This is the end :('
    },
    createScreen: {
        header: 'Create something new with',

        titlePlaceholderText: 'Title...',
        descriptionPlaceholderText: 'Description...',
        ingredientsPlaceholderText: 'Ingredients (comma seperated)...',
        stepsPlaceholderText: 'Steps (comma seperated)...',
    },
    profileScreen: {
        text1: 'Joined ',
        text2: 'Recipes: ',
        text3: 'Likes: ',
        text4: 'Your recipes:',
        text5: '  recipes:',

        bottomText: 'This is the end :('
    },
    settingsScreen: {
        changePicText: 'Change profile pic',
        changeLanguageTxt: 'Change language',
        changeThemeTxt: 'Change theme',
    },
    favouritesScreen: {
        header1: 'Your favourite ',
        header2: ' recipes',

        text1: 'This is the end :('
    },
    recipeScreen: {
        header1: ' users like this recipe.',
        header2: ' user likes this recipe.',

        text1: 'By ',
        text2: 'Created:',
        text3: 'Ingredients:',
        text4: 'Steps:',

        userNotFound: 'User removed',
    },
    commentsScreen: {
        commentPlaceholderText: 'Comment...',
    },
    commentCard:{
        text1: 'By ',
        text2: 'Created: ',

        userNotFound: 'User removed',
    },
    recipeCard:{
        text1: 'By ',
        text2: 'Created: ',
        text3: 'Ingredients:',

        userNotFound: 'User removed',
    },
    popupDefault:{
        buttonConfirm: "Yes",
        buttonNotConfirm: "No",
        buttonInfo: "Close"
    },
    //popup sign-up screen
    signUpFailPopup:{
        title: 'Error while creating account.',
        content: 'Error: '
    },
    signUpSuccessPopup:{
        title: 'Success.',
        content: 'Your account have been created. Log in to the app.'
    },
    //popups crate screen
    addingRecipePopup:{
        title: 'Confirm action.',
        content: 'Do You really want to add this recipe?'
    },
    notLoggedInPopup:{
        title: 'Upsss...',
        content: 'You are not logged in XD.'
    },
    addingRecipeError1Popup:{
        title: "Upss...!!!",
        content: 'Title and description is necessary.',
    },
    addinngRecipeSuccessPopup:{
        title: "Success!",
        content: 'Recipe has been added.',
    },
    errorWhileSavingRecipePopup:{
        title: "Error!",
        content: 'Err r ooooor whl  ee sav i nn gg',
    },
    //popups ProfileScreen
    loggingOutPopup:{
        title: 'Confirm action.',
        content: 'Do you really want to log out?',
    },
    //popups (recipe)contentScreen
    deleterecipePopup:{
        title: "Confirm action.",
        content: 'Do you really want to delete this recipe?',
    },
    deleteRecipeSuccess:{
        title: "Success!",
        content: "Your's recipe has been deleted.",
    },
    deleteRecipeError:{
        title: "Error!",
        content: "There was an error while removing your recipe.",
    },
    changeLanguagePopUp:{
        title: "Change language",
        content: "Change language for application.",
    },
    changeThemePopUp:{
        title: "Change Theme",
        content: "Change theme for application.",
    },
    changeAvatarPopUp:{
        title: "Change Avatar",
        content: "Pick the image.",

        button: "Pick",
    },
    //popups (recipe)commentsScreen
    validateCommentPopup:{
        title: "Upss...",
        content: "Comment can't be MT.",
    },
    //Themes
    themesText:[
        {name: 'Light', value: 'light'},
        {name: 'Dark', value: 'dark'},
        {name: 'Green', value: 'green'},
    ]
}
