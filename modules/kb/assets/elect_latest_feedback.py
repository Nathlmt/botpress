import json
import csv
import numpy as np

with open("./datas/latest_clean_feedback_fr.json", "r") as file:
    feedback = json.load(file)

plus_ones = []
minus_ones = []
neutrals = []
for entry in feedback:
    title = entry["title"]["fr"]
    content = entry["content"]["fr"]
    bot_message = entry["bot_message"]
    for fb in entry["feedback"]["fr"]:
        dic = {
            "title": title,
            "bot_message": bot_message,
            "utterance": fb["utterance"],
            "polarity": fb["polarity"]
        }
        if fb["polarity"] == 1:
            plus_ones.append(dic)
        if fb["polarity"] == -1:
            minus_ones.append(dic)
        if fb["polarity"] == 0:
            neutrals.append(dic)
print(len(plus_ones))
choosen_plus_ones = np.random.choice(plus_ones, 500 // 3,
                                     replace=False).tolist()
choosen_minus_ones = np.random.choice(minus_ones, 500 // 3,
                                      replace=False).tolist()

choosen_neutral_ones = np.random.choice(
    neutrals,
    500 - (len(choosen_plus_ones) + len(choosen_minus_ones)),
    replace=False).tolist()

questions_feedback = choosen_plus_ones + choosen_minus_ones + choosen_neutral_ones
with open("./datas/latest_feedback_500.csv", "w") as file:
    writer = csv.writer(file)
    writer.writerow(["Question", "Bot"])
    for entry in questions_feedback:
        # print(entry["bot_message"])
        writer.writerow([
            entry["polarity"], entry["utterance"].replace("\n", " "),
            entry["bot_message"].replace("\n", " ")
        ])
