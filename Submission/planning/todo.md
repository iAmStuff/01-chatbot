# TO DO

## Important

- [x] Ask for username and utilize it during conversation.
- [x] Optimize parseType function to use loops or other functions to avoid repetition.
- [x] Add an actual response when input fails to validate as expected.
- [x] Create a conversation reset function and add hook into getBotReply.
- [x] Stop bot from reprinting question line when theme changes.
- [x] Stop bot from reaching a dead end after receiving an invalid input.

## Optional

- [x] Make "theme" commands show in chat log
- [ ] Add ability to change userName at any point during the conversation. (I think this one might be difficult given how the getDiscussionTree function rewrites currentBranch in its entirety)
- [ ] Add more usage of the user's name in discussionTree
- [ ] Turn anime result strings into objects that include more detail on the anime.
- [x] Fix up this godawful css styling
- [x] Ensure first question re-prompt after theme change remains the same, even after numerous theme switches
