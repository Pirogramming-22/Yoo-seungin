def brGame(player):
    global num
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
            print("=" * 58)
            print(f"player{'A' if player == 'playerB' else 'B'} win!")
            return True
    return False

num = 0

while num < 31:
    if brGame("playerA"):
        break
    if brGame("playerB"):
        break 

