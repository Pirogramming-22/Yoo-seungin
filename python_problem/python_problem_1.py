import random as r

def brGame(player):
    global num
    if player == "computer":
        user_input = r.randint(1,3)
    else:
        while True:
            try:
                user_input = int(input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) : "))
                if user_input not in [1, 2, 3]:
                    print("1, 2, 3 중 하나를 입력하세요")
                    continue
                break
            except ValueError:
                print("정수를 입력하세요")

    for i in range(1, user_input+1):
        num += 1
        print(f"{player} : {num}")
        if num >= 31:
            print("=======================================================================")
            print(f"{'player' if player == 'computer' else 'computer'} win!")
            return True
    return False

num = 0

while num < 31:
    if brGame("computer"):
        break
    if brGame("player"):
        break