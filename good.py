t = int(input())
for _ in range(t):

    n = int(input())
    arr = list(map(int, input().split()))

    c_nega = 0
    sum = 0
    arr.sort()

    oper = 0

    for i in arr:
        if i<0:
            c_nega+=1
        sum+=i
    
    if sum >= 0 and c_nega%2==0:
        print(0)

    else:

        for i in arr:
            sum -= 2*i
            c_nega-=1

            oper+=1
            if sum >= 0 and c_nega%2==0:
                break

        print(oper)


