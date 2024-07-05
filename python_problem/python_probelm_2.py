students = {}

# Menu 1: Inserting students Info
def insert_student(name, mid_score, final_score):
    students[name] = {'mid': mid_score, 'final': final_score, 'grade': None}

# Menu 2: Grading
def grade_students():
    for name, scores in students.items():
        mid_score = scores['mid']
        final_score = scores['final']
        average = (mid_score + final_score) / 2
        if average >= 90:
            grade = 'A'
        elif average >= 80:
            grade = 'B'
        elif average >= 70:
            grade = 'C'
        elif average >= 60:
            grade = 'D'
        else:
            grade = 'F'
        students[name]['grade'] = grade

# Menu 3: Printing students Info
def print_students():
    print("-----------------------------------")
    print("name    mid   final  grade")
    print("-----------------------------------")
    for name, info in students.items():
        mid = info['mid']
        final = info['final']
        grade = info['grade'] if info['grade'] is not None else 'N/A'
        print(f"{name:<7} {mid:<5} {final:<6} {grade}")
    print("-----------------------------------")

# Menu 4: Deleting students Info
def delete_student(name):
    if name in students:
        del students[name]
        return True
    else:
        return False


print("*Menu*******************************")
print("1. Inserting students Info(name score1 score2)")
print("2. Grading")
print("3. Printing students Info")
print("4. Deleting students Info")
print("5. Exit program")
print("*************************************")

while True:
    choice = input("Choose menu 1, 2, 3, 4, 5 : ")
    if choice == "1":
        data = input("Enter name mid-score final-score: ").split()
        if len(data) != 3:
            print("Num of data is not 3!")
        else:
            name, mid_score, final_score = data[0], data[1], data[2]
            if not mid_score.isdigit() or not final_score.isdigit():
                print("Score is not positive integer!")
            else:
                mid_score, final_score = int(mid_score), int(final_score)
                if name in students:
                    print("Already exist name!")
                else:
                    insert_student(name, mid_score, final_score)
    elif choice == "2":
        if not students:
            print("No student data!")
        else:
            grade_students()
            print("Grading to all students.")
    elif choice == "3":
        if not students:
            print("No student data!")
        elif any(info['grade'] is None for info in students.values()):
            print("There is a student who didn't get grade.")
        else:
            print_students()
    elif choice == "4":
        if not students:
            print("No student data!")
        else:
            name = input("Enter the name to delete: ")
            if delete_student(name):
                print(f"{name} student information is deleted.")
            else:
                print("Not exist name!")
    elif choice == "5":
        print("Exit Program!")
        break
    else:
        print("Wrong number. Choose again.")
