const commands = [
    {
        option: '-token',
        aliases: ['-auth', '-authorization', '-t'],
        description: 'Login Token from Discord. Required to be able to access the DMs and channels.',
        displayArgs: '[token]',
        requiresArgs: true,
        setVar: 'token'
    },
    {
        option: '-id',
        aliases: ['-user', '-channel'],
        description: 'ID of user or channel to backup messages from.',
        displayArgs: '[id]',
        requiresArgs: true,
        setVar: 'id'
    },
    {
        option: '-type',
        aliases: [],
        description: 'Whether the specified ID is from a channel or an user. Defaults to "user".',
        displayArgs: '[user|channel]',
        requiresArgs: true,
        setVar: 'type'
    },
    {
        option: '-location',
        aliases: ['-save-in', '-path'],
        description: 'Location where the backup will be saved. Defaults to the date.',
        displayArgs: '[path]',
        requiresArgs: true,
        setVar: 'path'
    },
    {
        option: '-tohtml',
        aliases: ['-parse'],
        description: 'Parse a JSON backup to a browsable HTML file. Specify file using -location.',
        displayArgs: '',
        requiresArgs: false,
        setVar: 'toHtml'
    },
]

module.exports = commands;