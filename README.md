# KB-Primo-VE-Announcement

**Announcement service**: Displays a message on the top of the screen, every time there is a new text (other than ``` &nbsp; ```) in the nui.message.announcement code table, if it hasn't already been dismissed by user.

![Screenshot](announcement.jfif)     

# Create the package
* npm install
* npm run prepare

# Install in Primo VE
```bash
cd MYVIEW
npm install kb-primo-ve-announcement --save-dev
```

Add to bottom of `js/main.js`
```javascript
require('kb-primo-ve-announcement/dist/index.js');
```
