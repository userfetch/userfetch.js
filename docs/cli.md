### CLI

<table border="0" align="left">
    <tr>
        <td><code>-h</code> <code>--help</code></td>
        <td><em>[boolean] [optional]</em></td>
        <td>Show help</td>
    </tr>
    <tr>
        <td><code>-v</code> <code>--version</code></td>
        <td><em>[boolean] [optional]</em></td>
        <td>Show version number</td>
    </tr>
    <tr>
        <td><code>-u</code> <code>--user</code></td>
        <td><em>[string] [optional]</em></td>
        <td>Login of the user to fetch.<br>If none, your data will be fetched</td>
    </tr>
    <tr>
        <td><code>-c</code> <code>--config</code></td>
        <td><em>[string] [optional]</em></td>
        <td>Path to a custom <code>.mjs</code> config file</td>
    </tr>
    <tr>
        <td><code>-s</code> <code>--svg</code></td>
        <td><em>[string] [optional]</em></td>
        <td><blockquote>not yet implemented</blockquote>Path to save svg output to</td>
    </tr>
    <tr>
        <td><code>-t</code> <code>--token</code></td>
        <td><em>[boolean] [optional]</em></td>
        <td>Asks for your GitHub PAT through stdin<br>The token must have <code>repo</code>, <code>read:org</code>, and <code>user</code> scopes</td>
    </tr>
    <tr>
        <td><code>--ci</code></td>
        <td><em>[boolean] [optional]</em></td>
        <td>Continuous Integration mode<br>Disables writing to and reading of config dir<br>Requires <code>--config</code><br>Disables <code>--token</code> <code>--first-run</code></td>
    </tr>
    <tr>
        <td><code>--no-color</code> <code>--nocolor</code></td>
        <td><em>[boolean] [optional]</em></td>
        <td><blockquote>not yet implemented</blockquote>Disables colored output in terminal</td>
    </tr>
    <tr>
        <td><code>--first-run</code> <code>--firstrun</code></td>
        <td><em>[boolean] [optional]</em></td>
        <td><blockquote>WARNING: This will overwrite your config file with default one</blockquote>Trigger the firstrun script</td>
    </tr>
    <tr>
        <td><code>-d</code> <code>--debug</code></td>
        <td><em>[boolean] [optional]</em></td>
        <td>Show additional debugging output<br>You can use this to find all variables that can used in the config file</td>
    </tr>
</table>
