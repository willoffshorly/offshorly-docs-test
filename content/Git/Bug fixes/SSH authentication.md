# PROBLEM

When running git pull, I'm receiving the error:
`ERROR: Repository not found. fatal: Could not read from remote repository. Please make sure you have the correct access rights and the repository exists.`

## CAUSE

This is an SSH issue since I'm using two SSH keys (one for work under `user1` and one for side projects under `user2`). In order to be authenticated I need to configure the SSH connection to use the SSH key that I need.

---

## SOLUTION

To switch to your other GitHub account, you'll need to update your SSH config file to use the SSH key associated with that account.

Assuming you already have an SSH key associated with your `user1` account, you can follow these steps:

1. Open your SSH config file using the following command:

   ```bash
   nano ~/.ssh/config
   ```

2. Add the following lines to the file:

   <!--snippet 92576f30bdf31868dfe407eee88ff97a-->
   <!--title: Testing title-->
   <!--descr: Testing description-->

   ```yml
   Host github.com
   HostName github.com
   User git
   IdentityFile ~/.ssh/user_id1

   Host github.com
   HostName github.com
   User git
   IdentityFile ~/.ssh/user_id2
   ```

   <!--/snippet-->

   Replace `user_id2` with the actual name of your SSH key file for your `user2` account.

3. Save and exit the file by pressing `CTRL + X`, then `Y`, and finally `Enter`.

4. Test the SSH connection with your `user2` account:

   ```bash
   ssh -T git@github.com
   ```

   You should now see a message like the following:

   ```text
   Hi jasonclchua! You've successfully authenticated, but GitHub does not provide shell access.
   ```

   Now your SSH connection is authenticated with your `user2` account.

---

To switch back to your `user1` account, you can start the ssh-agent in the background;

```shell
eval "$(ssh-agent -s)"
```

and then add the ssh_id that you want to use. In this case, the ssh_id is saved as `user_id1`

```bash
ssh-add ~/.ssh/user_id1
```

This will add the SSH key associated with your `user1` account to your SSH agent, allowing you to switch between your two accounts as needed.
