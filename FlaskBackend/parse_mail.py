def get_mail_creds():
    with open("/home/ebube/Documents/AsoVaultPass/creds/creds.txt", "r") as f:
        data = f.readlines() # turn the data into an array
    mail = ""
    for i in data:
        # find the information that has mail in it
        if "mail" in i:
            mail = i[:-1] # this will remove the newline character
    # since this is a string, I am using the .
    return mail[(mail.index("=")+1):]