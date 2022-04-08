import gdown
import sys, fitz
import spacy
import nlp
import pickle
import random
from fitz import TEXT_DEHYPHENATE
# # link = data['resume']
# # link = 'https://drive.google.com/file/d/1BZjao3Bcrmatgp1MzQxqhiuR3LgGAgZM/view?usp=sharing'
# # link = link.strip('https://drive.google.com/file/d/')
# # link = link.strip('/view?usp=sharing')
# # url = 'https://drive.google.com/uc?export=download&id='+link
# # output = 'C:\\Users\\admin\\Downloads\\' + link + '.pdf'
# # gdown.download(url, output, quiet=False)
#
#
# # fname = output
# # doc = fitz.open(fname)
# # text = ''
# # for p in doc:
# #   text = text + str(p.get_text())
# #   text = ' '.join(text.split('\n'))
# # print(text)
#
# # doc = nlp_model(text)
# # for ent in doc.ents:
# #     print(f'{ent.label_.upper():{30}}-{ent.text}')
#
#
train_data = pickle.load(open('train_data.pkl','rb'))
nlp = spacy.blank('en')
def train_model(train_data):
  if 'ner' not in nlp.pipe_names:
    ner = nlp.create_pipe('ner')
    nlp.add_pipe(ner, last=True)

  for _, annotation in train_data:
      for ent in annotation['entities']:
        ner.add_label(ent[2])

  other_pipes = [pipe for pipe in nlp.pipe_names if pipe != 'ner']
  with nlp.disable_pipes(*other_pipes):
      optimizer = nlp.begin_training()
      for itn in range(10):
        print("Starting iteration " + str(itn))
        random.shuffle(train_data)
        losses = {}
        index = 0
        for text, annotations in train_data:
          try:
            nlp.update(
                [text],
                [annotations],
                drop=0.3,
                losses=losses
            )
          except Exception as e:
            pass

train_model(train_data)
nlp.to_disk('nlp_model')
nlp_model = spacy.load('nlp_model')