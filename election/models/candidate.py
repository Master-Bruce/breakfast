from django.db import models

from election.models.image import Image


class Candidate(models.Model):
    sub_election = models.ForeignKey('SubElection', on_delete=models.CASCADE, default=0)
    name = models.CharField(max_length=250)
    image = models.ForeignKey(Image, blank=True, null=True, on_delete=models.SET_NULL)
    saved_votes = models.IntegerField(blank=True, null=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return '{} - {}'.format(self.sub_election, self.name)

    @property
    def votes(self):
        if self.saved_votes:
            return self.saved_votes
        return self.ballot_set.count()
