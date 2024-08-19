def read_file(file):
    with open(file) as f:
        rows = f.readlines()
        for row in rows:
            rowArr = row.split("name=")
            nameId = rowArr[1].split(" ")[-1].split(">")[0]
            nameId = nameId.replace("id=", "")
            nameId = nameId.replace('"', '')
            print(nameId)
            f = open(nameId+".svg", "w")
            f.write(row)
            f.close()




if __name__ == '__main__':
    read_file("D:/Practice_Websites/For Portfolio/Interactive_Map/Interactive_World_Map/src/assets/seperateSvgs.html")